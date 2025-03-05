"use client";
import { useEffect, useState } from "react";

import { useApi } from "./useApi";

const useProducts = (params = {}) => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        district,
        area,
        percentage,
        pagination,
        from_date,
        from_time,
        to_date,
        to_time,
    } = params;

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        let queryParams = "";

        if (district) queryParams += `district=${district}&`;
        if (pagination) queryParams += `pagination=${pagination}&`;
        if (area) queryParams += `area=${area}&`;
        if (percentage) queryParams += `percentage=${percentage}&`;

        if (from_date) queryParams += `from_date=${from_date}&`;
        if (from_time) queryParams += `from_time=${from_time}&`;
        if (to_date) queryParams += `to_date=${to_date}&`;
        if (to_time) queryParams += `to_time=${to_time}&`;

        // Remove the trailing '&' if there is one
        queryParams = queryParams.slice(0, -1);

        // Build the full URL with the query parameters
        const newUrl = `${window.location.pathname}?${queryParams}`;

        // Update the URL without area reload
        window.history.pushState(null, "", newUrl);

        // Perform the API request
        const {
            success,
            responseData,
            error: fetchError,
        } = await apiRequest({
            endpoint: `/sold-product?${queryParams}`,
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
    }, [
        district,
        area,
        pagination,
        percentage,
        from_date,
        from_time,
        to_date,
        to_time,
    ]);

    return { data, loading, error };
};

export default useProducts;
