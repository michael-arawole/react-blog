import { useParams, /* useNavigate */ } from 'react-router-dom';
import useFetch from './useFetch';
import parse from 'html-react-parser';
import ErrorBlock from './ErrorBlock';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch('https://demo.logad.net/react-blog/api/blogs/' + id);
    // const navigate = useNavigate();
    /* const handleDelete = (id) => {
        fetch('https://demo.logad.net/react-blog/api/blogs/' + blog.id, {
            method: 'DELETE'
        })
        .then(() => {
            navigate('/');
        })
    } */
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    return (
        <div className="blog-details">
            {error && <ErrorBlock message={error}/>}
            {isPending && (
                <div className="p-5 mx-auto sm:p-10 md:p-16">
                    <div className="flex flex-col m-8 max-w-3xl rounded shadow-md mx-auto animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-700"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>    
            )}
            {blog && (
                <div className="p-5 mx-auto sm:p-10 md:p-16">
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                        <img src={blog.image} alt="" className="w-full h-60 sm:h-96 bg-gray-500" />
                        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
                            <div className="space-y-2">
                                <a rel="noopener noreferrer" href="/#" className="inline-block text-2xl font-semibold sm:text-3xl text-white">{blog.title}</a>
                                <p className="text-xs text-gray-400">By { }
                                    <a rel="noopener noreferrer" href="/#" className="text-xs hover:underline">{blog.author} on {formatDate(blog.updated_at)}</a>
                                </p>
                            </div>
                            <div className="text-gray-100">
                                {parse(blog.content)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default BlogDetails;