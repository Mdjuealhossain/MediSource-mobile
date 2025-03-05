import { useEffect, useState } from "react";

import { useApi } from "./useApi";

const useArea = () => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null); // Stores the fetched data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchArea = async () => {
        setLoading(true);
        setError(null);

        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: "/area/1",
            method: "GET",
            auth: false,
        });

        if (success) {
            setData(responseData);
        } else {
            setError(fetchError);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchArea();
    }, []);

    return { data, loading, error };
};

export default useArea;
