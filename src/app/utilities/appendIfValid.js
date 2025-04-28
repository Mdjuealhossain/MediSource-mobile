export const appendIfValid = (formData, key, value) => {
    // 1) strip off any “[…]” suffix so we can match just the base name
    const baseKey = key.replace(/\[.*\]$/, "");

    // 2) if incoming value was null, swap in your per-field default
    if (value === null) {
        switch (baseKey) {
            case "return_qty":
                value = 0;
                break;
            case "is_dr":
                value = "0";
                break;
            case "high_low":
                value = "high";
                break;
            // you can add more cases here if needed
        }
    }

    // 3) only append truly “valid” values
    if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
    }
};
