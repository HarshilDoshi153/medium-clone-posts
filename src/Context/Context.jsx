import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from '../firebase/firebase';
import Loading from '../components/Demo/Loading';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';

const BlogContext = createContext();
const Context = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loader, setLoader] = useState(true);
    const [publish, setPublish] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUser(user);
            }
            else{
                setCurrentUser(null);
            }
            setLoader(false)
        });
        return () => unsubscribe();
    },[currentUser])

    useEffect(() =>{
      const getUsers = () =>{
        const postRef = query(collection(db, "users"));
        onSnapshot(postRef, (snapshot) =>{
          setAllUsers(
            snapshot.docs.map((doc) =>({
              ...doc.data(),
              id: doc.id,
            }))
          )
        })
      };
      getUsers();
    },[])

    useEffect(() =>{
      const getPosts = () =>{
        const postsRef = query(collection(db, "posts"));
        onSnapshot(postsRef, (snapshot) =>{
          setAllPosts(
            snapshot.docs.map((doc) =>({
              ...doc.data(),
              id: doc.id,
            }))
          )
        })
      };
      getPosts();
    },[])
  return (
    <BlogContext.Provider value={{currentUser, setCurrentUser, publish, setPublish, allUsers, allPosts}}>
      {loader ? <Loading/> : children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext)