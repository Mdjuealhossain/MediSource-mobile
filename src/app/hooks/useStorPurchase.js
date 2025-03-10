import { useApi } from "./useApi";

const useStorPurchase = () => {
    const { apiRequest } = useApi();

    const purchases = async (userData) => {
        return await apiRequest({
            endpoint: "/store-purchase",
            method: "POST",
            data: userData,
        });
    };

    return { purchases };
};

export default useStorPurchase;
