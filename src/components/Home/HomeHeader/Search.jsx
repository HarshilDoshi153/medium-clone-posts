import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import Modal from '../../../utils/Modal'
import { Blog } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';

const Search = ({ modal, setModal }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { allPosts } = Blog();
  const searchData = allPosts && allPosts?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <Modal modal={modal} setModal={setModal}>
        <div className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
          ${modal ? "visible opacity-100" : "invisible sm:visible sm:opacity-100 opacity-0"} transition-all duration-100
        `}>
          <div className='flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10 w-[30rem]'>
            <span className='text-2xl text-gray-400'>
              <CiSearch />
            </span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search...' className='bg-transparent outline-none py-[0.7rem] text-sm w-full text-black1' />
            {search !== "" && (<div className='absolute right-0 left-0 top-full bg-white shadow rounded-md'>
              {searchData.length > 0 ?
                <>{searchData.map((post, i) => (
                  <div key={i} onClick={() => { navigate(`/post/${post.id}`); setSearch(""); }} className='p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer'>
                    <h2 className='font-bold text-gray-600 line-clamp-1 capitalize tent-sm'>{post.title}</h2>
                    <div className='font-bold text-gray-400 line-clamp-2' dangerouslySetInnerHTML={{ __html: post.description }}></div>
                  </div>
                ))}</>
                :
                <p className='p-3 text-lg text-gray-600 text-center'>No Posts Found</p>}
            </div>)}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Search
