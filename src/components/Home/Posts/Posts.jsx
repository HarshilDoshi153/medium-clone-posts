import React from 'react'
import useFetch from '../../hooks/useFetch';
import Loading from '../../Demo/Loading';
import PostCard from './PostCard';

const Posts = () => {
  const {data, loading} = useFetch("posts");
  return (
    <section className='flex flex-col gap-[2.5rem]'>
      {loading ? <Loading/> : data.map((post,i) => <PostCard post={post} key={i}/>)}
    </section>
  )
}

export default Posts
