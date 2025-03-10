import useStorPurchase from "@/app/hooks/useStorPurchase";
import React from "react";
import { useForm } from "react-hook-form";

const PurchaseModal = ({ data, isOpen, closeModal }) => {
    const { register, handleSubmit, reset } = useForm();
    const { purchases } = useStorPurchase();

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split("T")[0];
    };

    const onSubmit = async (formData) => {
        // const finalFormData = {
        //     order_date: getCurrentDate(),
        //     district_id: "1",
        //     product_ids: data.id,
        //     quantities: data.quantities,
        //     buying_price: data.buying_price,
        //     product_type: data.product_type,
        //     total_sale: "0",
        //     stock_item_amount: "0",
        //     short_item: "0",
        //     return: "0",
        //     total_delivery: "0",
        //     total_order: "0",
        //     purchase_sum: "0",
        //     expense_amount: "0",
        //     expense_description: "",
        //     profit: "0",
        //     is_dr: "1",
        //     high_low: "high",
        // };
        const { loading, success, error, responseData } = await purchases(
            finalFormData
        );
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
            console.log("Purchase Added Successfully");
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
