import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { db } from '../../../../firebase/firebase';
import Loading from '../../../Demo/Loading';
import { Blog } from '../../../../Context/Context';
import FollowBtn from '../../UsersToFollow/FollowBtn';
import { readTime } from '../../../../utils/helper';
import moment from 'moment';

const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const {currentUser} = Blog();
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const postRef = doc(db, "posts", postId); // Correctly pass postId
                const getPost = await getDoc(postRef);

                if (getPost.exists()) {
                    const postData = getPost.data();
                    // console.log(postData)

                    if (postData?.UserId) {
                        const userRef = doc(db, "users", postData.UserId); // No need for ?. after userId
                        const getUser = await getDoc(userRef);

                        if (getUser.exists()) {
                            const userData = getUser.data();
                            setPost({ ...postData, ...userData, id: postId }); // Assign postId to post
                        }
                    } else {
                        setPost(postData); // If no userId, just set post data
                    }
                } else {
                    toast.error("Post not found");
                }
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, post?.UserId]);
    const {title, userImg, userName, UserId, description, created, postImg} = post;
    return (
        <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navigate(`/profile/${UserId}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={userImg}
                alt="user-img"
              />
              <div>
                <div className="capitalize">
                  <span>{userName}</span>
                  {currentUser && currentUser?.uid !== UserId && (
                    <FollowBtn userId={UserId} />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {readTime({ __html: description })} min read .
                  <span className="ml-1">{moment(created).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
              <div className="flex items-center gap-5">
                Like
                Comment
              </div>
            </div>
            <div className="mt-[3rem]">
              {postImg && (
                <img
                  className="w-full h-[400px] object-cover"
                  src={postImg}
                  alt="post-img"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </section>
        </>
      )}
    </>
    )
}

export default SinglePost
