import React from 'react'
import useFetch from '../../hooks/useFetch';
import { formatDate, readTime } from '../../../utils/helper';

const PostCard = ({ post }) => {
    const { title, description, postImg, created, id: id, UserId } = post;
    console.log(created);
    const { data, loading } = useFetch("users")
    const getUserData = data && data.find((user) => user?.id === UserId)
    return (
        <>
            <div className='flex flex-col sm:flex-row gap-4 cursor-pointer border-b py-2 border-gray-400'>
                <div className='flex-[2.5rem]'>
                    <p className='pb-2 font-semibold capitalize'>{getUserData.userName}</p>
                    <h2 className='text-xl font-bold line-clamp-1 leading-6 capitalize'>{title}</h2>
                    <div className='py-1 text-gray-500 line-clamp-4 leading-5' dangerouslySetInnerHTML={{ __html: description }}></div>
                    <p className='text-xs text-gray-600 py-2'>{readTime({ __html: description })} min read . {formatDate(created)}</p>
                </div>
                <div className='flex'>
                    <img src={postImg} alt='Post Image' className='w-[20rem] rounded-md'/>
                </div>
            </div>
        </>
    )
}

export default PostCard
