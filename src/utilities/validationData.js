import * as Yup from "yup";

export const validationSchema = Yup.object({
    phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be exactly 10 digits") // ফোন নম্বর ১০ ডিজিট হতে হবে
        .required("Phone number is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
