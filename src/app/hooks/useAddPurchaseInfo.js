"use client";
import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { buildQueryParams } from "../utilities/buildQueryParams";

const useAddPurchaseInfo = (params = {}) => {
    const { apiRequest } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { district, date, area_id, user_id, pagination, product_type, is_dr, high_low, isPurchase, isShort } = params;

    const queryString = buildQueryParams({ district, date, area_id, user_id, pagination, product_type, is_dr, high_low });

    const fetchProducts = async () => {
        // Check if either 'district' or 'area_id' is present
        if (!district && !area_id) {
            // If both are missing, no API call
            return;
        }

        setLoading(true);
        setError(null);

        const newUrl = `${window.location.pathname}?${queryString}`;

        // Only update the URL if it's different to prevent unnecessary state changes
        if (window.location.search !== `?${queryString}`) {
            window.history.pushState(null, "", newUrl);
        }

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

    // useEffect to trigger fetch when dependencies change
    useEffect(() => {
        fetchProducts();
    }, [district, date, area_id, user_id, pagination, isPurchase, isShort, product_type, is_dr, high_low]);

    return { data, loading, error };
};

export default useAddPurchaseInfo;
