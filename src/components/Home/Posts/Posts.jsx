import React from 'react'
import useFetch from '../../hooks/useFetch';
import Loading from '../../Demo/Loading';
import PostCard from './PostCard';

const Posts = ({ userId, posts }) => {
  // Fetch the follow list
  const { data: follows, loading: followsLoading } = useFetch("users", userId, "follows");
  // Fetch all posts
  const { data: allPosts, loading: postsLoading } = useFetch("posts");

  if (followsLoading || postsLoading) {
    return <Loading />;
  }

  // Filter posts by authors in the follow list
  const filteredPosts = allPosts.filter((post) =>
    follows.some((follow) => follow.userId === post.UserId)
  );
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {filteredPosts.slice(0, posts).map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </section>
  );
};


export default Posts
