import { Link } from 'react-router-dom';

const Articles = ({ blogs, title, handleDelete }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    return (
        <>
            {blogs.map((blog) => (
                <article className="flex flex-col bg-gray-900" key={blog.id}>
                    <img alt="" className="object-cover w-full h-52 bg-gray-500" src={blog.image}/>
                    <div className="flex flex-col flex-1 p-6">
                        <a rel="noopener noreferrer" href="javascript:" className="text-xs tracking-wider uppercase hover:underline text-violet-400">{blog.author}</a>
                        <Link to={`${process.env.PUBLIC_URL}/blogs/${blog.id}`}>
                            <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{blog.title}</h3>
                        </Link>
                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                            <span>{formatDate(blog.updated_at)}</span>
                            <span>2.1k views</span>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
}
 
export default Articles;