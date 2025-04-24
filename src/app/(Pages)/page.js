"use client";
import { useEffect, useState } from "react";

import Products from "@/widget/Products";
import { useTab } from "../contexApi";
import Tabs from "@/components/Tabs";
import useAddPurchaseInfo from "../hooks/useAddPurchaseInfo";
import { getFormattedDate } from "../utilities/getFormattedDates";
import AlartModal from "@/components/ErrorModal";
import { set } from "react-hook-form";
import useModal from "../hooks/useModal";
import PurchaseModal from "@/components/PurchaseModal";
import { prepareFormData } from "../utilities/prepareFormData";
import useStorPurchase from "../hooks/useStorPurchase";

const Home = () => {
    const [success, setSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMsg, setIsMsg] = useState(null);
    const [isSpecial, setIsSpecial] = useState(false);
    const { isOpen: open, openModal, closeModal } = useModal();
    const { setIsData, isFilterData, activeTab, isPurchase, isShort, setTitle, initializePurchases, purchases, setIsShort } = useTab();
    const { purchases: expence } = useStorPurchase();

    const presentDate = getFormattedDate(isFilterData?.date);

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const previousDay = date.toISOString().split("T")[0];

    const info = {
        date: presentDate || previousDay,
        pagination: 5000,
        district: isFilterData?.district?.id || "1",
        area_id: isFilterData?.area?.id || "11",
        user_id: isFilterData?.user?.id,
        isShort: isShort,
        isPurchase: isPurchase,
    };

    const { data } = useAddPurchaseInfo(info);

    // purchase data
    useEffect(() => {
        if (data?.data?.product_list) {
            initializePurchases(data.data.product_list);
        }
    }, [data]);

    const order = data?.data?.product_list;
    const purchases_lists = purchases.filter((item) => !item.isPs);
    const ps_data = purchases?.filter((item) => item.isPs);
    // const purchases = data?.data?.product_list?.filter((item) => item.buying_price > 0 && item.is_dr !== "1").map((item) => ({ ...item, isPs: false }));

    const short = data?.data?.product_list?.filter((item) => item.product_type == "short" && item.buying_price == 0);
    const all = data?.data?.product_list?.filter((item) => item.buying_price < 1 && item.product_type !== "short" && item.product_type !== "stock ");
    const high = purchases?.filter((item) => item.buying_price > (item.rate - (item.rate * 4) / 100) * item.total_qty * 1.01);
    const dr = data?.data?.product_list?.filter((item) => item.buying_price > 0 && item.is_dr == "1");
    const returned = purchases?.filter((item) => item.return_qty);

    const test = data?.data?.product_list?.filter((item) => item.product_id == "1638");

    const low = purchases?.filter((item) => item.buying_price < (item.rate - (item.rate * 4) / 100) * item.total_qty * 0.99);

    const purcgaseTotalAmountSum = purchases?.reduce((sum, product) => sum + product.buying_price, 0);

    const purcgaseSpecialTotalAmountSum = purchases?.reduce((sum, product) => sum + product.total_amount, 0);

    const orderSum = order?.reduce((sum, product) => sum + product.total_amount, 0);
    const drSum = dr?.reduce((sum, product) => sum + product.total_amount, 0);
    const shortSum = short?.reduce((sum, product) => sum + product.total_amount, 0);

    useEffect(() => {
        if (activeTab == "order" && isSpecial) {
            setIsData(orderSum);
            setTitle("Order");
        }
        if (activeTab == "purchase" && isSpecial) {
            setIsData(purcgaseSpecialTotalAmountSum);
            setTitle("Purchase");
        }
        if (!isSpecial && activeTab == "purchase") {
            setIsData(purcgaseTotalAmountSum);
            setTitle("Purchase");
        }
        if (activeTab == "dr") {
            setIsData(drSum);
            setTitle("D-R");
        }
        if (!isSpecial && activeTab == "short") {
            setIsData(shortSum);
            setTitle("Short");
        }
    }, [activeTab, data]);

    const storPurchase = {
        date: data?.data?.date,
        district_id: data?.data?.district,
        area_id: isFilterData?.area?.id || "11",
        total_amount: data?.data?.total_amount,
    };

    console.log("data?.data---", order);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPhone = localStorage.getItem("phoneNumber");

            if (storedPhone && ["01854673267", "12345678910", ""].includes(storedPhone)) {
                setIsSpecial(true);
            }
        }
    }, []);

    const handleExpense = async (value) => {
        const final_data = {
            ...storPurchase,
            expense_amount: value,
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
            const { success } = await expence(shortData);
            if (success) {
                setIsOpen(true);
                setSuccess(true);
                setIsMsg("Added successfully");
                setIsShort((prev) => !prev);
                // reset();
            }
        } catch (err) {
            console.error("Short request error:", err);
        }
    };

    return (
        <div className=" relative">
            <button onClick={openModal} className=" px-2 py-1 bg-warning_main text-white rounded absolute -top-[54px]  left-1/2 -translate-x-1/2">
                Add Expense
            </button>
            <div className=" my-4 px-4">
                <Tabs tabs={isSpecial ? tabsPhone?.data : tabs?.data} contentClass={"md:mt-10 mt-6"} isSpecial={isSpecial}>
                    {!isSpecial
                        ? tabs?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products products={activeTab == "purchase" ? purchases_lists : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "short" ? short : activeTab == "dr" ? dr : activeTab == "all" ? all : activeTab == "p-s" ? ps_data : []} storPurchase={storPurchase} IsAdd={content.value == "all" || content.value == "short"} type={activeTab} />
                              </div>
                          ))
                        : tabsPhone?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products isSpecial={isSpecial} products={activeTab == "purchase" ? purchases_lists : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "dr" ? dr : activeTab == "return" ? returned : order} storPurchase={storPurchase} IsAdd={content.value == "all"} type={activeTab} />
                              </div>
                          ))}
                </Tabs>
            </div>
            <PurchaseModal onReturn={handleExpense} isOpen={open} closeModal={closeModal} placeholder={"enter Expense"} />
            <AlartModal isOpen={isOpen} openModal={() => setIsOpen(true)} closeModal={() => setIsOpen(false)} message={isMsg} success={success} />
        </div>
    );
};

export default Home;

const tabs = {
    data: [
        { id: 1, value: "all", name: "All" },
        { id: 2, value: "purchase", name: "Purchase" },
        { id: 3, value: "p-s", name: "P-S" },
        { id: 7, value: "short", name: "Short" },
        { id: 4, value: "dr", name: "D-R" },
        { id: 5, value: "high", name: "High" },
        { id: 6, value: "low", name: "Low" },
    ],
};
const tabsPhone = {
    data: [
        { id: 1, value: "order", name: "Order" },
        { id: 2, value: "purchase", name: "Purchase" },
        { id: 4, value: "dr", name: "D-R" },
        { id: 5, value: "return", name: "Return" },
    ],
};
