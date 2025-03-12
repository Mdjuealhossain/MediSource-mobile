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
    const { isData, setIsData, isFilterData, activeTab } = useTab();
    const { presentDay } = getFormattedDates(isFilterData?.date);

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    const info = {
        date: presentDay,
        pagination: 5000,
        district: isFilterData?.district?.id,
        area_id: isFilterData?.area?.id,
        user_id: isFilterData?.user?.id,
    };

    const { data } = useAddPurchaseInfo(info);
    // const { data: purchases, loading, error } = usePurchaseHistory();
    const purchases = data?.data?.product_list.filter(
        (item) => item.buying_price > 0
    );
    const all = data?.data?.product_list.filter(
        (item) => item.buying_price < 1
    );

    useEffect(() => {
        if (activeTab === 1) {
            setIsData(data?.data?.product_list);
        }
        // if (activeTab === 2) {
        //     setIsData(purchases?.data?.product_list);
        // }
    }, []);

    const storPurchase = {
        date: data?.data?.date,
        district_id: data?.data?.district,
        total_amount: data?.data?.total_amount,
    };

    console.log("purchases----", purchases);

    return (
        <div className=" mt-4 px-4">
            <Tabs tabs={tabs?.data} contentClass={"md:mt-10 mt-6"}>
                <div id={1}>
                    {isFilterData?.district?.id &&
                    isFilterData?.area?.id &&
                    isFilterData?.area?.id ? (
                        <Products
                            isshowap={true}
                            products={all}
                            storPurchase={storPurchase}
                            type="all"
                        />
                    ) : (
                        <h6 className=" py-12 text-center text-H5 font-semibold text-black/20">
                            Please select date and district
                        </h6>
                    )}
                </div>
                <div id={2}>
                    {purchases && purchases.length > 0 ? (
                        <Products products={purchases} />
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
    ],
};
