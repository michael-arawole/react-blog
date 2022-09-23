import { useState,useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();
        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data for resource')
                }
                return res.json()
            })
            .then(data => {
                setData(data.data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        return () => abortCtrl.abort();
    },[]);
    return {data, isPending, error}
}

export default useFetch;