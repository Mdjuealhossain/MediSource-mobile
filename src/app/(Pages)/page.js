"use client";
import { useEffect, useState } from "react";

import Products from "@/widget/Products";
import { useTab } from "../contexApi";
import Tabs from "@/components/Tabs";
import useAddPurchaseInfo from "../hooks/useAddPurchaseInfo";
import { getFormattedDate } from "../utilities/getFormattedDates";
import AlartModal from "@/components/ErrorModal";
import { set } from "react-hook-form";

const Home = () => {
    const [isSpecial, setIsSpecial] = useState(false);

    const { setIsData, isFilterData, activeTab, isPurchase, isShort, setTitle } = useTab();
    const presentDate = getFormattedDate(isFilterData?.date);

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const previousDay = date.toISOString().split("T")[0];

    const info = {
        date: presentDate || previousDay,
        pagination: 5000,
        district: isFilterData?.district?.id || "1",
        area_id: isFilterData?.area?.id,
        user_id: isFilterData?.user?.id,
        isShort: isShort,
        isPurchase: isPurchase,
    };

    const { data } = useAddPurchaseInfo(info);

    const order = data?.data?.product_list;
    const purchases = data?.data?.product_list?.filter((item) => item.buying_price > 0 && item.is_dr !== "1");
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

    console.log("orderSum=", short);

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
        if (!isSpecial && activeTab == "dr") {
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
        total_amount: data?.data?.total_amount,
    };

    // ✅ Fixing isSpecial state update and console log issue
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPhone = localStorage.getItem("phoneNumber");

            if (storedPhone && ["01854673267", "12345678910", ""].includes(storedPhone)) {
                setIsSpecial(true);
            }
        }
    }, []);

    console.log("data?.data?.product_list", all);

    return (
        <>
            <div className=" my-4 px-4">
                <Tabs tabs={isSpecial ? tabsPhone?.data : tabs?.data} contentClass={"md:mt-10 mt-6"} isSpecial={isSpecial}>
                    {!isSpecial
                        ? tabs?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products products={activeTab == "purchase" ? purchases : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "short" ? short : activeTab == "dr" ? dr : activeTab == "all" ? all : []} storPurchase={storPurchase} IsAdd={content.value == "all" || content.value == "short"} type={activeTab} />
                              </div>
                          ))
                        : tabsPhone?.data.map((content) => (
                              <div key={content.id} value={`${content.value}`}>
                                  <Products isSpecial={isSpecial} products={activeTab == "purchase" ? purchases : activeTab == "high" ? high : activeTab == "low" ? low : activeTab == "dr" ? dr : activeTab == "return" ? returned : order} storPurchase={storPurchase} IsAdd={content.value == "all"} type={activeTab} />
                              </div>
                          ))}
                </Tabs>
            </div>
        </>
    );
};

export default Home;

const tabs = {
    data: [
        { id: 1, value: "all", name: "All" },
        { id: 2, value: "purchase", name: "Purchase" },
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
