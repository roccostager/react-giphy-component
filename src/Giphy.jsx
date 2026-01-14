const useGiphyURL = () => {  // Custom Hook
    const [giphyURL, setGiphyURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    return { giphyURL, error, loading };
}

function Giphy() {
    const { giphyURL, error, loading } = useGiphyURL();

    return (<>
        <h1>Giphy!</h1>
    </>);
}

export default Giphy;