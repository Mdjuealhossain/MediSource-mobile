"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStarOfLife } from "react-icons/fa";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "@/app/utilities/validationData";
import AlartModal from "@/components/ErrorModal";
import useSignIn from "@/app/hooks/useSignIn";
import useModal from "@/app/hooks/useModal";

const LoginForm = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const { isOpen, openModal, closeModal } = useModal();
    const { signIn } = useSignIn();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // Loading state

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (formdata) => {
        setLoading(true);
        try {
            const { loading, success, error, responseData } = await signIn(
                formdata
            );
            localStorage.setItem("phoneNumber", formdata.phone);
            if (selectedCheckbox) {
                localStorage.setItem("rememberMe", true);
            }
            console.log("responseData", responseData);
            if (responseData?.data.token) {
                setMessage(responseData.message);
                setSuccess(true);
                openModal();

                console.log("first", responseData?.data?.token);
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setMessage(responseData.message);
                openModal();
            }
            reset();
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
            openModal(); // Open error modal
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-5">
                        <label>
                            <span className="flex font-semibold mb-3">
                                Phone Number
                                <FaStarOfLife
                                    size={6}
                                    className="text-error_main"
                                />
                            </span>
                        </label>
                        <input
                            type="number"
                            {...register("phone")}
                            placeholder="Enter your phone number"
                            className="p-2 w-full rounded bg-white border border-warning_main text-black text-body2 "
                        />
                        {errors.phone && (
                            <div className=" text-body2 text-error_main mt-1">
                                {errors.phone.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label>
                            <span className="flex font-semibold mb-3">
                                Password
                                <FaStarOfLife
                                    size={6}
                                    className="text-error_main"
                                />
                            </span>
                        </label>
                        <span className="relative">
                            <input
                                type={isShowPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Enter your password"
                                className="p-2 w-full rounded bg-white border border-warning_main text-black text-body2"
                            />
                            {isShowPassword ? (
                                <span
                                    onClick={() => setIsShowPassword(false)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                                >
                                    <IoEyeSharp
                                        size={16}
                                        className="text-warning_main"
                                    />
                                </span>
                            ) : (
                                <span
                                    onClick={() => setIsShowPassword(true)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                                >
                                    <IoEyeOff
                                        size={16}
                                        className="text-warning_main"
                                    />
                                </span>
                            )}
                        </span>
                        {errors.password && (
                            <div className=" text-body2 text-error_main mt-1">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <label
                            className="flex items-center hover:cursor-pointer gap-3 text-body2 font-normal leading-normal w-fit h-min"
                            onChange={() =>
                                setSelectedCheckbox(!selectedCheckbox)
                            }
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className={`rounded h-4 w-4 ${
                                        selectedCheckbox
                                            ? "bg-warning_main text-white"
                                            : "bg-white"
                                    } border border-warning_main appearance-none`}
                                />
                                <BsCheck
                                    size={16}
                                    className="absolute top-0 text-white"
                                />
                            </div>
                            <p className="text-body2">Remember Me</p>
                        </label>

                        <Link href="#">
                            <p className="font-semibold text-warning_main">
                                Forgot Password?
                            </p>
                        </Link>
                    </div>

                    <div className="mb-3 lg:mb-6">
                        <button
                            type="submit"
                            className={
                                "bg-warning_main py-2 w-full hover:bg-warning_dark text-white"
                            }
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </div>
                </div>
            </form>
            {/* alart Modal */}
            <AlartModal
                isOpen={isOpen && message}
                openModal={openModal}
                closeModal={closeModal}
                message={message}
                success={success}
            />
        </>
    );
};

export default LoginForm;
