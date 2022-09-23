import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const data = {title, content, author, imageUrl};
        fetch('https://demo.logad.net/react-blog/api/blogs', {
            method: 'POST',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log('New blog added');
            console.log(response);
            if (!response.ok) {
                throw Error('Failed to fetch data for resource')
            }
            return response.json();
        })
        .then((result) => {
            alert('Blog added');
            navigate(`${process.env.PUBLIC_URL}/blogs/${result.data.id}`);
        })
        .catch((err) => {
            setIsPending(false);
            console.log(err);
        })
    }

    return (
        <div className="flex flex-col mt-5 max-w-md p-6 mx-auto rounded-md sm:p-10 text-gray-100">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Create Blog</h1>
                <p className="text-sm text-gray-400">Create a new blog</p>
            </div>
            <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Blog Title</label>
                        <input type="text" name="title" placeholder="Title" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Blog Author</label>
                        <input type="text" name="" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Image URL</label>
                            <a rel="noopener noreferrer" href="/#" className="text-xs hover:underline text-gray-400">Upload?</a>
                        </div>
                        <input type="url" name="imageUrl" placeholder="Url to image" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Blog Content</label>
                        <textarea type="text" name="" placeholder="content" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        {!isPending && <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Create Blog</button>}
                        {isPending && <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900" disabled>Please wait..</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}
 
export default CreateBlog;