"use client";
import React, { useEffect, useState } from "react";

import { useTab } from "@/app/contexApi";
import PurchaseModal from "@/components/PurchaseModal";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAllSums } from "@/app/utilities/sumSlice";
import useAddPurchaseInfo from "@/app/hooks/useAddPurchaseInfo";
import { prepareFormData } from "@/app/utilities/prepareFormData";
import useStorPurchase from "@/app/hooks/useStorPurchase";

const Report = () => {
    const [extra, setExtra] = useState("");
    const [cost, setCost] = useState("");

    const { isFilterData, isSpecial, purchases, setIsShort, initializePurchases } = useTab();
    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: isExtra, openModal: openExtra, closeModal: closeExtra } = useModal();
    const { purchases: extraDis } = useStorPurchase();

    const disctictValue = isFilterData?.district?.value;
    const areaValue = isFilterData?.area?.value;
    const userValue = isFilterData?.user?.value;

    const info = {
        date: isFilterData?.date,
        pagination: "5000",
        district: disctictValue?.toString(),
        area_id: areaValue?.toString(),
        user_id: userValue?.toString(),
    };
    const { data } = useAddPurchaseInfo(info);

    const allPurchaseData = data?.data?.product_list;
    // purchase data
    useEffect(() => {
        if (allPurchaseData?.length > 0) {
            initializePurchases(allPurchaseData);
        }
    }, [data]);

    const purchases_lists = purchases.filter((item) => !item.isPs);
    const returned = purchases?.filter((item) => item.return_qty);
    const dr = allPurchaseData?.filter((item) => item.buying_price > 0 && item.is_dr == "1");
    const short = allPurchaseData?.filter((item) => item.product_type == "short" && item.buying_price == 0);
    const all = allPurchaseData?.filter((item) => item.buying_price < 1 && item.product_type !== "short" && item.product_type !== "stock ");
    // sums
    const orderSum = allPurchaseData?.reduce((sum, product) => sum + product.total_amount, 0);
    const purchaseTotalAmountSum = purchases_lists?.reduce((sum, product) => sum + product.buying_price, 0);
    const purchaseTotalAmountSumIsSpecial = purchases_lists?.reduce((sum, product) => sum + product.total_amount, 0);
    const totalStockAmount = all?.reduce((sum, product) => sum + product.total_amount, 0);
    const returnedSum = returned?.reduce((sum, product) => sum + product.total_amount, 0);
    const drSum = dr?.reduce((sum, product) => sum + product.total_amount, 0);
    const totalAllShort = short?.reduce((sum, product) => sum + product.total_amount, 0);

    // Admin all sum
    const total_costs = purchaseTotalAmountSum + Number(cost);

    // special all sum
    const totalDelivary = purchaseTotalAmountSumIsSpecial + totalStockAmount - (returnedSum + drSum + extra);

    console.log("allPurchaseData", purchases);

    useEffect(() => {
        if (extra) {
            localStorage.setItem("extra", extra);
        }
        if (cost) {
            localStorage.setItem("cost", cost);
        }
    }, [cost, extra]);

    useEffect(() => {
        const storeCost = localStorage.getItem("cost");
        const storeExtra = localStorage.getItem("extra");
        if (storeExtra) {
            setExtra(storeExtra);
        }
        if (storeCost) {
            setCost(storeCost);
        }
    }, []);
    const handleCosts = (value) => {
        setCost(value);
    };

    const handleExtra = async (value) => {
        setExtra(value);
        let extra_discount = isNaN(value) ? 0 : Number(value);
        const final_data = {
            date: isFilterData?.date,
            district_id: disctictValue?.toString(),
            area_id: areaValue?.toString(),
            extra_discount: extra_discount,
            expense_amount: 0,
            product_id: "1",
            product_type: "purchase",
            buying_price: 0,
            total_qty: 1,
            is_dr: "1",
            return_qty: "0",
            high_low: "high",
        };

        const shortData = prepareFormData(final_data);

        try {
            const { success } = await extraDis(shortData);
            if (success) {
                setIsShort((prev) => !prev);
            }
        } catch (err) {
            console.error("Short request error:", err);
        }
    };

    return (
        <>
            <div className="py-6 px-4 relative">
                {isSpecial ? (
                    <button onClick={openExtra} className="px-2 py-1 bg-warning_main text-white rounded absolute -top-9 right-14">
                        1%
                    </button>
                ) : (
                    <button onClick={openModal} className="px-2 py-1 bg-warning_main text-white rounded absolute -top-9 right-14">
                        cost +
                    </button>
                )}

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Report</h2>
                    <Link href={"/"} className="px-2 py-1 bg-black/50 text-white rounded flex items-center justify-center gap-1">
                        Back <MdOutlineArrowRightAlt size={18} />
                    </Link>
                </div>
                <div className="flex flex-col gap-2 pb-4 mb-8">
                    <div className="flex items-center gap-1 justify-center">
                        <p className="text-base font-medium capitalize">area:</p>
                        <p className="text-sm font-medium capitalize">{isFilterData?.area?.label}</p>
                    </div>
                </div>

                {isSpecial ? (
                    <>
                        <div className="flex flex-col gap-2 border-b border-black pb-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total order</p>
                                <p className="text-sm capitalize">{parseFloat((orderSum || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total purchase</p>
                                <p className="text-sm capitalize">{parseFloat((purchaseTotalAmountSumIsSpecial || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total stock</p>
                                <p className="text-sm capitalize">{parseFloat((totalStockAmount || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total short</p>
                                <p className="text-sm capitalize">{parseFloat((totalAllShort || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total return</p>
                                <p className="text-sm capitalize">{parseFloat((returnedSum || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total D-R Amount</p>
                                <p className="text-sm capitalize">{parseFloat((drSum || 0).toFixed(2))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total 1% Extra</p>
                                <p className="text-sm capitalize">{extra || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <p className="text-sm font-medium capitalize">total Delivary</p>
                            <p className="text-sm font-medium capitalize">{parseFloat((totalDelivary || 0).toFixed(2))}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-2 border-b border-black pb-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">total purchases</p>
                                <p className="text-sm capitalize">{purchaseTotalAmountSum}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm capitalize">cost</p>
                                <p className="text-sm capitalize">
                                    <span className="mr-4">{"(+)"}</span> {cost || 0}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <p className="text-sm font-medium capitalize">total cost</p>
                            <p className="text-sm font-medium capitalize">{total_costs}</p>
                        </div>
                    </>
                )}
            </div>
            <PurchaseModal onReturn={handleCosts} isOpen={isOpen} closeModal={closeModal} placeholder={"Enter Cost"} />
            <PurchaseModal onReturn={handleExtra} isOpen={isExtra} closeModal={closeExtra} placeholder={"Enter Extra"} />
        </>
    );
};

export default Report;
