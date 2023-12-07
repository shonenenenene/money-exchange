import { useEffect, useState } from 'react';

interface useFetchProps {
    url: string;
    onLoad: (data: any) => void;
}

export const useFetch = ({ url, onLoad }: useFetchProps) => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (url) {
            setLoading(true);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    onLoad(data);
                    setIsError(false);
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    setIsError(true);
                    console.error(e, 'FETCH_ERROR');
                });
        }
    }, [url]);

    return {
        isLoading,
        isError,
    };
};
