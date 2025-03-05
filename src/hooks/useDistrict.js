import { useEffect, useState } from "react";
import { useApi } from "./useApi";
// import { useApi } from "./useApi";

const useGetDistrict = () => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null); // Stores the fetched data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchDestrict = async () => {
        setLoading(true);
        setError(null);

        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: "/district",
            method: "GET",
        });

        if (success) {
            setData(responseData);
        } else {
            setError(fetchError);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchDestrict();
    }, []);

    return { data, loading, error };
};

export default useGetDistrict;
