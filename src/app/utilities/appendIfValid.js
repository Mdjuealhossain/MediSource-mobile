// Utility function to append data only if it's valid
export const appendIfValid = (formData, key, value) => {
    if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
    }
};
