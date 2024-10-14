import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { LiaTimesSolid } from 'react-icons/lia';
import { Blog } from '../../../../Context/Context'
import TagsInput from 'react-tagsinput';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from "../../../../firebase/firebase";
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Preview = ({ setPublish, title, description }) => {
    const { currentUser } = Blog();
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [truncatedDescription, setTruncatedDescription] = useState('');
    const [preview, setPreview] = useState({
        photo: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Set truncated version to 95 characters or less
        if (description.length > 95) {
            setTruncatedDescription(description.substring(0, 95) + '...');
        } else {
            setTruncatedDescription(description); // Keep the full description if it's less than 95 chars
        }
    }, [description]);
    const handleClick = () => {
        imageRef.current.click();
    }
    const handleSubmit = async() => {
        try {
            setLoading(true);
            if (title === "" || description === "" || tags.length === 0) {
                toast.error("All fields are required!");
            }
            if (title.length < 15) {
                toast.error("The title must be aleast 15 letters!")
            }
            const collections = collection(db, "posts");
            const storageRef = ref(storage, `image/${preview.photo.name}`);
            await uploadBytes(storageRef, preview?.photo);

            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(collections, {
                UserId: currentUser?.uid,
                title: title,
                description,
                tags,
                postImg: imageUrl,
                created: Date.now(),
                pageViews: 0
            })
            toast.success("Post has been created");
            navigate("/")
        }
        catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }
    return (
        <section className="absolute inset-0 bg-white z-30">
            <div className="size my-[2rem]">
                <span
                    onClick={() => setPublish(false)}
                    className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
                    <LiaTimesSolid />
                </span>
                {/* preview the text  */}
                <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
                    <div className="flex-[1]">
                        <h3>Story Preview</h3>
                        <div onClick={handleClick}
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat ">
                            {!imageUrl && "Add Image"}
                        </div>
                        <input onChange={(e) => {
                            setImageUrl(URL.createObjectURL(e.target.files[0]));
                            setPreview({ ...preview, photo: e.target.files[0] });
                        }} ref={imageRef} type="file" hidden />
                        <input value={title} type="text" placeholder="Title" className="outline-none w-full border-b border-gray-300 py-2" readOnly />
                        <ReactQuill
                            value={truncatedDescription}
                            theme="bubble"
                            placeholder="Tell Your Story..."
                            className="py-3 border-b border-gray-300"
                            readOnly
                        />
                        <p className="text-gray-500 pt-4 text-sm">
                            <span className="font-bold">Note:</span> Changes here will affect
                            how your story appears in public places like Medium’s homepage and
                            in subscribers’ inboxes — not the contents of the story itself.
                        </p>
                    </div>
                    <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
                        <h3 className="text-2xl">
                            Publishing to:
                            <span className="font-bold capitalize"> {currentUser.displayName} </span>
                        </h3>
                        <p>
                            Add or change topics up to 5 so readers know what your story is
                            about
                        </p>
                        <TagsInput value={tags} onChange={setTags} />
                        <button onClick={handleSubmit}
                            className="btn !bg-green-800 !w-fit !text-white !rounded-full px-2 py-1"> {loading ? "Submitting..." : "Publish Now"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Preview
