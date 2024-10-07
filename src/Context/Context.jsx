import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase/firebase';
import Loading from '../components/Demo/Loading';
import React, { createContext, useContext, useEffect, useState } from 'react'

const BlogContext = createContext();
const Context = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        setLoader(true)
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
  return (
    <BlogContext.Provider value={{currentUser, setCurrentUser}}>
      {loader ? <Loading/> : children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext)