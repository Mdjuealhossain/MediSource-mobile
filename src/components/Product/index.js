import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CgShortcut } from "react-icons/cg";
import { HiBan } from "react-icons/hi";

import useStorPurchase from "@/app/hooks/useStorPurchase";
import { useTab } from "@/app/contexApi";
import { appendIfValid } from "@/app/utilities/appendIfValid";
import { MdOutlineAssignmentReturn } from "react-icons/md";

import AlartModal from "../ErrorModal";
import { prepareFormData } from "@/app/utilities/prepareFormData";
import PurchaseModal from "../PurchaseModal";
import useModal from "@/app/hooks/useModal";

const Product = ({ item, index, onDelete, isshowap = false, storPurchase = {}, type = "", IsAdd, isSpecial = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const { isOpen: open, openModal: openReturn, closeModal: closeReturn } = useModal();
    const [isMsg, setIsMsg] = useState(null);
    const [isReturn, setIsReturn] = useState(null);

    const { register, handleSubmit, reset } = useForm();
    const { purchases } = useStorPurchase();
    const { purchases: short } = useStorPurchase();
    const { purchases: d_r } = useStorPurchase();
    const { setIsPurchase, setIsShort, setDontReceived } = useTab();

    const { date, district_id, total_amount } = storPurchase;
    const { product_type } = item;

    const rate = item.rate - (item.rate * 4) / 100;
    const amount = rate * item.total_qty;

    const handlePurchaseSubmit = async (formData) => {
        const final_data = {
            ...formData,
            ...item,
            ...storPurchase,
            buying_price: formData.purchase,
        };

        const postData = prepareFormData(final_data);
        try {
            const { success } = await purchases(postData);
            if (success) {
                setIsOpen(true);
                setSuccess(true);
                setIsMsg("Purchase Added!");
                setIsPurchase((prev) => !prev);
                reset();
            }
        } catch (err) {
            console.error("Purchase error:", err);
        }
    };

    const handleShort = async (data) => {
        const final_data = {
            ...data,
            ...storPurchase,
            product_type: "short",
        };

        const shortData = prepareFormData(final_data);
        try {
            const { success } = await short(shortData);
            if (success) {
                setIsOpen(true);
                setSuccess(true);
                setIsMsg("Shorted successfully");
                setIsShort((prev) => !prev);
                reset();
            }
        } catch (err) {
            console.error("Short request error:", err);
        }
    };
    const handleDr = async (data) => {
        const final_data = {
            ...data,
            ...storPurchase,
            is_dr: "1",
        };

        const drData = prepareFormData(final_data);
        try {
            const { success } = await d_r(drData);
            if (success) {
                setIsOpen(true);
                setSuccess(true);
                setIsMsg("Don't Received");
                setIsShort((prev) => !prev);
                reset();
            }
        } catch (err) {
            console.error("Short request error:", err);
        }
    };
    const handleReturn = async (value) => {
        const final_data = {
            ...item,
            ...storPurchase,
            return_qty: value,
        };

        const drData = prepareFormData(final_data);
        try {
            const { success } = await d_r(drData);
            if (success) {
                setIsShort((prev) => !prev);
                reset();
            }
        } catch (err) {
            console.error("Return request error:", err);
        }
    };

    const renderRate = () => (type === "purchase" || type === "high" || type === "low" ? (item.buying_price / item.total_qty || 0).toFixed(1) : rate.toFixed(1));

    const renderAmount = () => (type === "purchase" || type === "high" || type === "low" ? (item.buying_price || 0).toFixed(1) : amount.toFixed(1));

    return (
        <>
            <div className="flex items-center gap-1 w-full">
                <p className="font-medium text-subtitle1">{index + 1}.</p>
                <div className="w-full">
                    <div className="px-3 relative mb-1 py-2 rounded border border-gary_700 w-full bg-paper">
                        <h6 className="text-H6 font-medium mb-1">{item.name || "Unknown name"}</h6>
                        <div className="flex items-center gap-0.5">
                            <p className="text-body2">
                                Qty: <span className="font-semibold pl-1">{item.total_qty}</span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                R: <span className={`font-semibold pl-1 ${isSpecial ? "hidden" : "inline"}`}>{renderRate()} TK</span>
                                <span className={`font-semibold pl-1 ${!isSpecial ? "hidden" : "inline"}`}>{(item.rate || 0).toFixed(1)} TK</span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                A: <span className={`font-semibold pl-1 ${isSpecial ? "hidden" : "inline"}`}>{renderAmount()} TK</span>
                                <span className={`font-semibold pl-1 ${!isSpecial ? "hidden" : "inline"}`}>{(item.total_amount || 0).toFixed(1)} TK</span>
                            </p>
                        </div>
                        {isSpecial && type === "purchase" && (
                            <button disabled={item.is_dr == "1"} onClick={() => handleDr(item)} className={`px-4 py-1  text-warning_main absolute right-0 top-0 ${item.is_dr == "1" ? "bg-success_main/40" : "bg-success_main"}`}>
                                <HiBan />
                            </button>
                        )}
                        {isSpecial && type === "purchase" && (
                            <button disabled={item.return_qty} onClick={openReturn} className={`px-4 py-1  text-white  absolute right-0 bottom-0 ${item.return_qty ? "bg-warning_main/40" : "bg-warning_main"}`}>
                                <MdOutlineAssignmentReturn className="text-white" />
                            </button>
                        )}

                        {!isSpecial && type === "all" && product_type !== "short" && (
                            <button onClick={() => handleShort(item)} className=" px-2 py-1 bg-warning_main absolute right-0 top-0 ">
                                <CgShortcut className="text-white" />
                            </button>
                        )}
                    </div>

                    {IsAdd && (
                        <form onSubmit={handleSubmit(handlePurchaseSubmit)} className="bg-white z-50 rounded-md flex items-center justify-center">
                            <input {...register("purchase", { required: true })} placeholder="Enter Purchase" className="text-subtitle2 placeholder:text-subtitle2 w-1/2 outline-none border rounded-l px-4 py-[4px]" />
                            <button type="submit" className="text-body2 font-medium px-8 py-1 rounded-r text-white bg-success_main capitalize border w-1/2">
                                Add
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <AlartModal isOpen={isOpen} openModal={() => setIsOpen(true)} closeModal={() => setIsOpen(false)} message={isMsg} success={success} />

            <PurchaseModal onReturn={handleReturn} isOpen={open} closeModal={closeReturn} qnt={item.total_qty} />
        </>
    );
};

export default Product;
