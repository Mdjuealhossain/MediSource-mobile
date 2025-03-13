"use client";
import { useEffect } from "react";

import { getFormattedDates } from "../utilities/getFormattedDates";
import useProducts from "../hooks/useProducts";
import Products from "@/widget/Products";
import { useTab } from "../contexApi";
import Tabs from "@/components/Tabs";
import useAddPurchaseInfo from "../hooks/useAddPurchaseInfo";
import usePurchaseHistory from "../hooks/usePurchaseHistory";

const Home = () => {
    const { isData, setIsData, isFilterData, activeTab, isPurchase } = useTab();
    const { presentDay } = getFormattedDates(isFilterData?.date);

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    const info = {
        date: presentDay || today,
        pagination: 5000,
        district: isFilterData?.district?.id,
        area_id: isFilterData?.area?.id,
        user_id: isFilterData?.user?.id,
        product_type: "",
        is_dr: "",
        high_low: "",
    };

    const { data } = useAddPurchaseInfo(info, isPurchase);
    // const { data: purchases, loading, error } = usePurchaseHistory();
    const purchases = data?.data?.product_list?.filter(
        (item) => item.buying_price > 0
    );
    const all = data?.data?.product_list?.filter(
        (item) => item.buying_price < 1
    );

    const short = data?.data?.product_list?.filter(
        (item) => item.product_type == "short"
    );

    useEffect(() => {
        if (activeTab === 1) {
            setIsData(all);
        }
        if (activeTab === 2) {
            setIsData(purchases);
        }
        if (activeTab === 3) {
            setIsData(short);
        }
    }, [activeTab, data]);

    const storPurchase = {
        date: data?.data?.date,
        district_id: data?.data?.district,
        total_amount: data?.data?.total_amount,
    };

    console.log("data", data);

    return (
        <div className=" my-4 px-4">
            <Tabs tabs={tabs?.data} contentClass={"md:mt-10 mt-6"}>
                <div id={1}>
                    {isFilterData?.district?.id && isFilterData?.area?.id ? (
                        <Products
                            isshowap={true}
                            products={all}
                            storPurchase={storPurchase}
                            IsAdd={true}
                        />
                    ) : (
                        <h6 className=" py-12 text-center text-H5 font-semibold text-black/20">
                            Please select date and district
                        </h6>
                    )}
                </div>
                <div id={2}>
                    {purchases && purchases.length > 0 ? (
                        <Products products={purchases} type="purchases" />
                    ) : (
                        <h6 className=" py-12 text-center text-H5 font-semibold text-black/20">
                            Please select date and district
                        </h6>
                    )}
                </div>
                <div id={3}>
                    {isFilterData?.district?.id && isFilterData?.area?.id ? (
                        <Products
                            isshowap={true}
                            products={short}
                            storPurchase={storPurchase}
                            IsAdd={true}
                        />
                    ) : (
                        <h6 className=" py-12 text-center text-H5 font-semibold text-black/20">
                            Please select date and district
                        </h6>
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default Home;
const tabs = {
    data: [
        { id: 1, name: "All" },
        { id: 2, name: "Purchase" },
        { id: 3, name: "Short" },
        { id: 4, name: "D-R" },
        { id: 5, name: "High" },
        { id: 6, name: "Low" },
    ],
};
