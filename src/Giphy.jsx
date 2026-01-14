import { useState, useEffect } from "react";

const useGiphyData = () => {  // Custom Hook
    const [giphyData, setGiphyData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams({
                    'api_key': 'OqKZBnaUfQk9q1qd0kN9G2Bwq3Lte4ZE',
                    'limit': 1,
                    'offset': Math.floor( 1 + 99 * Math.random() ),
                });

                const request = new Request(`https://api.giphy.com/v1/gifs/trending?${params}`);

                const response = await fetch(request);
                if (!response.ok) throw Error(`${response.status}: ${response.statusText}`);

                const responseData = await response.json();
                const cleanedData = responseData?.data?.[0];
                setGiphyData(cleanedData);
            } catch (caughtError) {
                setError(caughtError);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { giphyData, error, loading };
}

function Giphy() {
    const { giphyData, error, loading } = useGiphyData();

    if (error) return <p>{error.message}</p>;
    if (loading) return <p>Loading...</p>;

    return (<>
        <h1>Giphy!</h1>
        <img src={giphyData.images.original.url} alt={giphyData.alt_text} />
        <p>Title: {giphyData.title}</p>
    </>);
}

export default Giphy;