export const appendIfValid = (formData, key, value) => {
    // Append value as-is, but treat undefined specially (optional)
    formData.append(key, value === undefined ? "" : value);
};
