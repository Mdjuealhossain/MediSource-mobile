import { useApi } from "./useApi";

const useSignIn = () => {
    const { apiRequest } = useApi();

    const signIn = async (userData) => {
        return await apiRequest({
            endpoint: "/admin-login",
            method: "POST",
            data: userData,
        });
    };

    return { signIn };
};

export default useSignIn;
