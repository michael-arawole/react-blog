import Articles from "./Articles";
import useFetch from "./useFetch";
import ErrorBlock from "./ErrorBlock";

const Home = () => {
    const {data: blogs, isPending, error} = useFetch('https://demo.logad.net/react-blog/api/blogs');
    return (
        <section className="pb-6 sm:pb-12 bg-gray-800 text-gray-100">
            <div className="container p-6 mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Recent Articles</h2>
                    <p className="font-serif text-sm text-gray-400">Most recent articles from API</p>
                </div>
                {error && <ErrorBlock message={error}/>}
                {isPending && <div>Loading...</div>}
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                    {blogs && <Articles blogs={blogs} title='Recent Articles'/>}
                </div>
            </div>
        </section>
    )
}

export default Home;