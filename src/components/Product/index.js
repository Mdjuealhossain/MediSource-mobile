import { useState } from "react";
import { useForm } from "react-hook-form";

import useModal from "@/app/hooks/useModal";
import useStorPurchase from "@/app/hooks/useStorPurchase";
import { useTab } from "@/app/contexApi";
import { getFormattedDates } from "@/app/utilities/getFormattedDates";
import { appendIfValid } from "@/app/utilities/appendIfValid";
import AlartModal from "../ErrorModal";
import { useRouter } from "next/navigation";
import { MdDoNotDisturbOff } from "react-icons/md";
import { CgShortcut } from "react-icons/cg";

const Product = ({ item, index, onDelete, isshowap = false, storPurchase = {}, type = "", IsAdd, isSpecial = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { purchases } = useStorPurchase();
    const { setIsPurchase, dontReceived, setDontReceived } = useTab();
    // Destructure storPurchase and item to make the code more readable
    const { date, district_id, total_amount } = storPurchase;
    const { product_id, total_qty, product_type } = item;

    const rate = item.rate - (item.rate * 4) / 100;
    const amount = rate * item.total_qty;
    const onSubmit = async (formData) => {
        const postData = new FormData();

        // Append all values if they are valid
        appendIfValid(postData, "order_date", date);
        appendIfValid(postData, "district_id", district_id);
        appendIfValid(postData, "total_sale", total_amount);
        appendIfValid(postData, `buying_price[${product_id}]`, formData.purchase);
        appendIfValid(postData, "product_ids[]", product_id);
        appendIfValid(postData, `quantities[${product_id}]`, total_qty);
        appendIfValid(postData, `product_type[${product_id}]`, product_type);
        appendIfValid(postData, "stock_item_amount", "10");
        appendIfValid(postData, "short_item", "0");
        appendIfValid(postData, "return", "0");
        appendIfValid(postData, "total_delivery", "10");
        appendIfValid(postData, "total_order", null); // Will not append since null
        appendIfValid(postData, "purchase_sum", null); // Will not append since null
        appendIfValid(postData, "expense_amount", "0");
        appendIfValid(postData, "expense_description", "");
        appendIfValid(postData, "profit", null); // Will not append since null
        appendIfValid(postData, "high_low", "high");

        try {
            const { loading, success, error, responseData } = await purchases(postData);
            if (success) {
                setIsPurchase((prev) => !prev);
            }

            reset();
        } catch (error) {
            console.log(error);
        } finally {
            console.log("onSubmit process finished.");
        }
    };

    const handleShort = async (data) => {
        console.log("data------", data);
        const shortData = new FormData();

        // // Helper to append only valid values
        // const appendIfValid = (formData, key, value) => {
        //     if (value !== null && value !== undefined) {
        //         formData.append(key, value);
        //     }
        // };

        // Extract product_id correctly
        const productId = data.product_id;

        // Append all values
        appendIfValid(shortData, "order_date", date); // make sure 'date' is defined in your scope
        appendIfValid(shortData, "district_id", district_id); // make sure 'district_id' is defined
        appendIfValid(shortData, "total_sale", data.total_amount);
        appendIfValid(shortData, `buying_price[${productId}]`, data.buying_price);
        appendIfValid(shortData, "product_ids[]", productId);
        appendIfValid(shortData, `quantities[${productId}]`, data.total_qty);
        appendIfValid(shortData, `product_type[${productId}]`, "short");
        appendIfValid(shortData, "stock_item_amount", "10");
        appendIfValid(shortData, "short_item", "0");
        appendIfValid(shortData, "return", "0");
        appendIfValid(shortData, "total_delivery", "10");
        appendIfValid(shortData, "expense_amount", "0");
        appendIfValid(shortData, "expense_description", "");
        appendIfValid(shortData, "high_low", "high");

        // Optional: log all FormData entries for debugging
        console.log("FormData being sent:");
        for (let [key, value] of shortData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const { loading, success, error, responseData } = await purchases(shortData);
            if (success) {
                setIsOpen(true);
                setSuccess(success);
                reset();
                window.location.reload();
            } else {
                console.error("API error:", error);
            }
            console.log("response", success);
        } catch (error) {
            console.error("Request failed:", error);
        } finally {
            console.log("onSubmit process finished.");
        }
    };

    return (
        <>
            <div className="flex items-center gap-1 w-full">
                <p className="font-medium text-subtitle1">{index + 1}.</p>
                <div className="w-full">
                    <div className="px-3 relative mb-1 py-2 rounded border border-gary_700 w-full bg-paper">
                        <h6 className="text-H6 font-medium mb-1">{item.name || "Unknown name"}</h6>
                        <div className="flex items-center gap-0.5">
                            <p className="text-body2">
                                Qty:
                                <span className="font-semibold pl-1">{item.total_qty}</span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                R:
                                <span className={`font-semibold pl-1 ${isSpecial ? "hidden" : "inline"}`}>
                                    {type == "purchase" || type == "high" || type == "low" ? parseFloat((item.buying_price / item.total_qty || 0).toFixed(1)) : parseFloat((rate || 0).toFixed(1))}
                                    TK
                                </span>
                                <span className={`font-semibold pl-1 ${!isSpecial ? " hidden" : "inline"}`}>
                                    {parseFloat((item.rate || 0).toFixed(1))}
                                    TK
                                </span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                A:
                                <span className={`font-semibold pl-1 ${isSpecial ? " hidden" : "inline"}`}>
                                    {type == "purchase" || type == "high" || type == "low" ? parseFloat((item.buying_price || 0).toFixed(1)) : parseFloat((amount || 0).toFixed(1))}
                                    TK
                                </span>
                                <span className={`font-semibold pl-1 ${!isSpecial ? "hidden" : "inline"}`}>
                                    {parseFloat((item.total_amount || 0).toFixed(1))}
                                    TK
                                </span>
                            </p>
                        </div>
                        {!isSpecial && type == "all" && item.product_type !== "short" && (
                            <span onClick={() => handleShort(item)} className=" px-2 py-1 bg-warning_main absolute right-0 top-0 ">
                                <CgShortcut className=" text-white" />
                            </span>
                        )}
                    </div>
                    {IsAdd && (
                        <form onSubmit={handleSubmit(onSubmit)} className=" bg-white z-50 rounded-md flex items-center justify-center">
                            <input
                                {...register("purchase", {
                                    required: true,
                                })}
                                placeholder="Enter Purchase"
                                className="text-subtitle2 placeholder:text-subtitle2 w-1/2 outline-none focus:outline-none border rounded-l px-4 py-[4px]"
                            />

                            <button type="submit" className="text-body2 font-medium px-8 py-1 rounded-r text-white bg-success_main capitalize border w-1/2">
                                Add
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {/* alart Modal */}
            <AlartModal isOpen={isOpen} openModal={() => setIsOpen(true)} closeModal={() => setIsOpen(false)} message={"Shorted successfully"} success={success} />
        </>
    );
};

export default Product;
