// Functions
import axios from "axios";

async function fetchListsData(url, options, setLoading, setError, setDataArray) {
    setLoading(true);
    try {
        const response = await axios.get(url, options);
        if (response.data) {
            setError(false);
        }
        setDataArray((prevData) => [...prevData, response.data]);
    } catch (e) {
        setError(true);
        console.error(e);
    }
    setLoading(false);
}

export default fetchListsData;