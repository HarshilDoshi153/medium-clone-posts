import React from 'react'
import useFetch from '../../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import PostCard from '../../../Posts/PostCard';
import Loading from '../../../../Demo/Loading';

const ProfileHome = () => {
  const { userId } = useParams();
  const { data: allPosts, loading: postsLoading } = useFetch("posts");
  console.log(postsLoading);
  let myPosts = [];
  if (!postsLoading) {
    myPosts = allPosts?.filter((post) => post.UserId === userId);
  }
  return (
    <>
      {postsLoading ? (
        <Loading />
      ) : (
        <section className="flex flex-col gap-[2.5rem] w-full">
          {myPosts && myPosts.map((post, i) => <PostCard post={post} key={i} />)}
        </section>
      )}
    </>
  )
}

export default ProfileHome
