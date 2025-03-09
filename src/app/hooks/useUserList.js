"use client";
import { useEffect, useState } from "react";

import { useApi } from "./useApi";
import { buildQueryParams } from "../utilities/buildQueryParams";

const useUserList = (params = {}) => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { search, pagination } = params;

    const queryString = buildQueryParams(params);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        // Perform the API request
        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: `/user-list?${queryString}`,
            method: "GET",
        });

        if (success) {
            setData(responseData);
        } else {
            setError(fetchError);
        }

        setLoading(false);
    };

    // Trigger fetch when any of these params change
    useEffect(() => {
        fetchProducts();
    }, [search, pagination]);

    return { data, loading, error };
};

export default useUserList;
