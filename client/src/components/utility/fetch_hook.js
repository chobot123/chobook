import { useEffect, useState } from "react"

const useData  = (url, method) => {
    const [data, setData] = useState(null);
    useEffect(() => {

        let ignore = false;

        const getData = async () => {
            try {

                const response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if(!ignore) {
                    setData(data);
                }

            }catch (err) {
                console.log(err);
                setData(null);
            }
        };

        getData();

        return () => {
            ignore = true;
        };

    }, [url, method])

    return data;
}

export default useData;