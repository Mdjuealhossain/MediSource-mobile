"use client";
import { useEffect, useState } from "react";

import { useApi } from "./useApi";
import { buildQueryParams } from "../utilities/buildQueryParams";

const useAddPurchaseInfo = (params = {}) => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { district, date, area_id, user_id, pagination } = params;

    const queryString = buildQueryParams(params);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        const newUrl = `${window.location.pathname}?${queryString}`;

        // Update the URL without area reload
        window.history.pushState(null, "", newUrl);

        // Perform the API request
        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: `/add-purchase-info?${queryString}`,
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
    }, [district, date, area_id, user_id, pagination]);

    return { data, loading, error };
};

export default useAddPurchaseInfo;
