import {useState, useEffect} from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
  
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // component is loading
        let isMounted = true;
        // if component is not ready, we cancel the request
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);

            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }
            catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            }
            finally{
                // isMounted && setIsLoading(false)
                isMounted && setTimeout(()=>setIsLoading(false), 2000)
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);
  
    return {data, fetchError, isLoading};
}

export default useAxiosFetch;