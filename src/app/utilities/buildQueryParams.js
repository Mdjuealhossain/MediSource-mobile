export const buildQueryParams = (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
    });

    return queryParams.toString();
};
