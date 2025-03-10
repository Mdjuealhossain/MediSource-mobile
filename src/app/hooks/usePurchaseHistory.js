import { useEffect, useState } from "react";

import { useApi } from "./useApi";

const usePurchaseHistory = () => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetSoldProducts = async () => {
        setLoading(true);
        setError(null);

        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: "/purchase-history",
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
        fetSoldProducts();
    }, []);

    return { data, loading, error };
};

export default usePurchaseHistory;
