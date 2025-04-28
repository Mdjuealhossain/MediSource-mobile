"use client";
import { useEffect, useMemo, useState } from "react";

import Products from "@/widget/Products";
import Tabs from "@/components/Tabs";
import { getFormattedDate } from "../utilities/getFormattedDates";
import { prepareFormData } from "../utilities/prepareFormData";
import useAddPurchaseInfo from "../hooks/useAddPurchaseInfo";
import PurchaseModal from "@/components/PurchaseModal";
import useStorPurchase from "../hooks/useStorPurchase";
import AlartModal from "@/components/ErrorModal";
import useModal from "../hooks/useModal";
import { useTab } from "../contexApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllSums } from "../utilities/sumSlice";

const Home = () => {
    const [success, setSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMsg, setIsMsg] = useState(null);
    const { isOpen: open, openModal, closeModal } = useModal();
    const { setIsData, isFilterData, activeTab, isPurchase, isShort, setTitle, initializePurchases, purchases, setIsShort, isSpecial, setIsSpecial } = useTab();
    const { purchases: expence } = useStorPurchase();

    const disctictValue = isFilterData?.district?.value;
    const areaValue = isFilterData?.area?.value;
    const userValue = isFilterData?.user?.value;

    const info = {
        date: isFilterData?.date,
        pagination: "5000",
        district: disctictValue?.toString(),
        area_id: areaValue?.toString(),
        user_id: userValue?.toString(),
        isShort: isShort,
        isPurchase: isPurchase,
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

    const ps_data = purchases?.filter((item) => item.isPs);
    const short = allPurchaseData?.filter((item) => item.product_type == "short" && item.buying_price == 0);
    const all = allPurchaseData?.filter((item) => item.buying_price < 1 && item.product_type !== "short" && item.product_type !== "stock ");
    const dr = allPurchaseData?.filter((item) => item.buying_price > 0 && item.is_dr == "1");

    const returned = purchases?.filter((item) => item.return_qty);

    // with 4% -
    const high = purchases?.filter((item) => item.buying_price > (item.rate - (item.rate * 4) / 100) * item.total_qty * 1.01);
    const low = purchases?.filter((item) => item.buying_price < (item.rate - (item.rate * 4) / 100) * item.total_qty * 0.99);

    // admin
    const purchaseTotalAmountSum = purchases_lists?.reduce((sum, product) => sum + product.buying_price, 0);
    const PsTotalAmountSum = ps_data?.reduce((sum, product) => sum + product.buying_price, 0);

    const stockPurchaseTotalAmountSum = purchases?.reduce((sum, product) => sum + product.stock * product.rate, 0);

    // admin 4%
    const all_sum = purchases?.reduce((sum, product) => sum + product.buying_price, 0);
    const purcgaseSpecialTotalAmountSum = purchases?.reduce((sum, product) => sum + product.total_amount, 0);

    const totalDiscountedAmountAllorde = all?.reduce((sum, product) => {
        const discountedRate = product.rate - (product.rate * 4) / 100;
        const discountedAmount = discountedRate * product.total_qty;
        return sum + discountedAmount;
    }, 0);
    const totalDiscountedAmountAllShort = short?.reduce((sum, product) => {
        const discountedRate = product.rate - (product.rate * 4) / 100;
        const discountedAmount = discountedRate * product.total_qty;
        return sum + discountedAmount;
    }, 0);

    // special admin

    const totalStockAmount = all?.reduce((sum, product) => sum + product.total_amount, 0);
    const orderSum = allPurchaseData?.reduce((sum, product) => sum + product.total_amount, 0);
    const purchaseTotalAmountSumIsSpecial = purchases_lists?.reduce((sum, product) => sum + product.total_amount, 0);
    const drSum = dr?.reduce((sum, product) => sum + product.total_amount, 0);
    const returnedSum = returned?.reduce((sum, product) => sum + product.total_amount, 0);
    const stock = allPurchaseData?.filter((item) => item.stock);
    const totalAllShort = short?.reduce((sum, product) => sum + product.total_amount, 0);

    console.log("dr---", data?.data);

    useEffect(() => {
        if (activeTab == "all" && !isSpecial) {
            setIsData(totalDiscountedAmountAllorde);
            setTitle("Order");
        }
        if (activeTab == "purchase" && !isSpecial) {
            setIsData(purchaseTotalAmountSum);
            setTitle("Purchase");
        }
        if (activeTab == "p-s" && !isSpecial) {
            setIsData(PsTotalAmountSum);
            setTitle("P-S");
        }

        if (activeTab == "short" && !isSpecial) {
            setIsData(totalDiscountedAmountAllShort);
            setTitle("Short");
        }

        if (activeTab == "order" && isSpecial) {
            setIsData(orderSum);
            setTitle("Order");
        }
        if (activeTab == "purchase" && isSpecial) {
            setIsData(purchaseTotalAmountSumIsSpecial);
            setTitle("Purchase");
        }
        if (activeTab == "dr") {
            setIsData(drSum);
            setTitle("D-R");
        }
        if (activeTab == "return" && isSpecial) {
            setIsData(returnedSum);
            setTitle("Return");
        }
        if (activeTab == "stock" && isSpecial) {
            setIsData(totalStockAmount);
            setTitle("Stock");
        }
        if (activeTab == "short" && isSpecial) {
            setIsData(totalAllShort);
            setTitle("Short");
        }
    }, [activeTab, data, purchases_lists]);

    const storPurchase = {
        date: data?.data?.date,
        district_id: data?.data?.district,
        area_id: isFilterData?.area?.value,
        total_amount: data?.data?.total_amount,
        expense_amount: data?.data?.purchase?.expense_amount || 0,
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPhone = localStorage.getItem("phoneNumber");
            const special = JSON.parse(localStorage.getItem("isSpecial"));
            if (storedPhone && ["01854673267", "12345678910", ""].includes(storedPhone)) {
                setIsSpecial(true);
                localStorage.setItem("isSpecial", true);
            }
        }
    }, []);

    const handleExpense = async (value) => {
        let expence_num = isNaN(value) ? 0 : Number(value);

        const final_data = {
            ...storPurchase,
            expense_amount: expence_num,
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
            }
        } catch (err) {
            console.error("Short request error:", err);
        }
    };

    console.log("sdgfvdbgv---", all);

    return (
        <div className=" relative">
            <div className="absolute -top-9 right-14 flex items-center gap-2">
                <p className=" text-center font-semibold text-white"> {parseFloat((stockPurchaseTotalAmountSum || 0).toFixed(2))}</p>
                <button onClick={openModal} className=" px-2 py-1 bg-warning_main text-white rounded ">
                    +
                </button>
            </div>

            <div className=" py-6 px-4">
                <Tabs tabs={isSpecial ? tabsPhone?.data : tabs?.data} contentClass={"md:mt-10 mt-6"} isSpecial={isSpecial}>
                    {!isSpecial
                        ? tabs?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products products={activeTab == "purchase" ? purchases_lists : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "short" ? short : activeTab == "dr" ? dr : activeTab == "all" ? all : activeTab == "p-s" ? ps_data : []} storPurchase={storPurchase} IsAdd={content.value == "all" || content.value == "short"} type={activeTab} />
                              </div>
                          ))
                        : tabsPhone?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products isSpecial={isSpecial} products={activeTab == "purchase" ? purchases_lists : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "dr" ? dr : activeTab == "return" ? returned : activeTab == "stock" ? all : activeTab == "short" ? short : allPurchaseData} storPurchase={storPurchase} type={activeTab} />
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
        { id: 3, value: "stock", name: "Stock" },
        { id: 4, value: "dr", name: "D-R" },
        { id: 5, value: "return", name: "Return" },
        { id: 6, value: "short", name: "Short" },
    ],
};
