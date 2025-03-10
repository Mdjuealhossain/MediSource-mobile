import useStorPurchase from "@/app/hooks/useStorPurchase";
import React from "react";
import { useForm } from "react-hook-form";

const PurchaseModal = ({ data, isOpen, closeModal }) => {
    const { register, handleSubmit, reset } = useForm();
    const { purchases } = useStorPurchase();
    const onSubmit = async (formData) => {
        const { loading, success, error, responseData } = await purchases();
        console.log("responseData", responseData);
        reset();
        closeModal();
        try {
            const { loading, success, error, responseData } = await purchases(
                formData
            );

            console.log("responseData", responseData);
            reset();
        } catch (error) {
            console.log("Something went wrong. Please try again.");
        } finally {
            alert("Purchase Added Successfully");
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-30 mx-4">
                    <div
                        className="fixed inset-0 bg-black/30"
                        onClick={closeModal}
                    ></div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-2 bg-white z-50 rounded-md w-[150px] flex flex-col items-center justify-center"
                    >
                        <input
                            {...register("purchase", { required: true })}
                            placeholder="Enter Purchase"
                            className="text-subtitle2 placeholder:text-subtitle2 w-full outline-none focus:outline-none border rounded px-4 py-[3px]"
                        />
                        <div className="w-full mt-2">
                            <button
                                type="submit"
                                className="text-body2 w-full font-medium px-4 py-1.5 rounded text-white bg-success_main capitalize"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default PurchaseModal;
