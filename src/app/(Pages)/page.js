"use client";
import { useEffect, useState } from "react";

import Products from "@/widget/Products";
import { useTab } from "../contexApi";
import Tabs from "@/components/Tabs";
import useAddPurchaseInfo from "../hooks/useAddPurchaseInfo";
import { getFormattedDate } from "../utilities/getFormattedDates";

const Home = () => {
    const [isSpecial, setIsSpecial] = useState(false);
    const { isData, setIsData, isFilterData, activeTab, isPurchase } = useTab();
    const presentDate = getFormattedDate(isFilterData?.date);

    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    };

    const info = {
        date: presentDate || today,
        pagination: 5000,
        district: isFilterData?.district?.id || "1",
        area_id: isFilterData?.area?.id || "9",
        user_id: isFilterData?.user?.id,
    };

    const { data } = useAddPurchaseInfo(info, isPurchase);
    const purchases = data?.data?.product_list?.filter(
        (item) => item.buying_price > 0
    );
    const all = data?.data?.product_list?.filter(
        (item) => item.buying_price < 1
    );
    const high = purchases?.filter(
        (item) => item.total_amount < item.buying_price
    );
    const low = purchases?.filter(
        (item) => item.total_amount > item.buying_price
    );
    const purcgaseTotalAmountSum = purchases?.reduce(
        (sum, product) => sum + product.buying_price * product.total_qty,
        0
    );

    useEffect(() => {
        if (activeTab === "purchase") {
            setIsData(purcgaseTotalAmountSum);
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

            if (
                storedPhone &&
                ["01854673267", "12345678910", "01770744899"].includes(
                    storedPhone
                )
            ) {
                setIsSpecial(true);
            }
        }
    }, []);

    console.log("isSpecial----", isSpecial);

    return (
        <div className=" my-4 px-4">
            <Tabs
                tabs={isSpecial ? tabsPhone?.data : tabs?.data}
                contentClass={"md:mt-10 mt-6"}
            >
                {!isSpecial
                    ? tabs?.data.map((content) => (
                          <div key={content.id} value={`${content.value}`}>
                              <Products
                                  products={
                                      activeTab === "purchase"
                                          ? purchases
                                          : activeTab === "high"
                                          ? high
                                          : activeTab === "low"
                                          ? low
                                          : activeTab === "1"
                                          ? []
                                          : all
                                  }
                                  storPurchase={storPurchase}
                                  IsAdd={content.value === ""}
                                  type={activeTab}
                              />
                          </div>
                      ))
                    : tabsPhone?.data.map((content) => (
                          <div key={content.id} value={`${content.value}`}>
                              <Products
                                  isSpecial={isSpecial}
                                  products={
                                      activeTab === "purchase"
                                          ? purchases
                                          : activeTab === "high"
                                          ? high
                                          : activeTab === "low"
                                          ? low
                                          : all
                                  }
                                  storPurchase={storPurchase}
                                  IsAdd={content.value === ""}
                                  type={activeTab}
                              />
                          </div>
                      ))}
            </Tabs>
        </div>
    );
};

export default Home;

const tabs = {
    data: [
        { id: 1, value: "", name: "All" },
        { id: 2, value: "purchase", name: "Purchase" },
        { id: 4, value: "1", name: "D-R" },
        { id: 5, value: "high", name: "High" },
        { id: 6, value: "low", name: "Low" },
    ],
};
const tabsPhone = {
    data: [
        { id: 2, value: "purchase", name: "Purchase" },
        { id: 4, value: "1", name: "D-R" },
    ],
};
