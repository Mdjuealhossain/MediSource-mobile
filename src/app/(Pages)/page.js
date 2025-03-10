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

    const info = {
        date: presentDay,
        pagination: 5000,
        district: isFilterData?.district?.id,
        area_id: isFilterData?.area?.id,
        user_id: isFilterData?.user?.id,
    };

    const { data } = useAddPurchaseInfo(info);
    const { data: purchases, loading, error } = usePurchaseHistory();

    console.log("purchases----", data?.data?.product_list);

    useEffect(() => {
        if (activeTab === 1) {
            setIsData(data?.data?.product_list);
        }
        // if (activeTab === 2) {
        //     setIsData(purchases?.data?.product_list);
        // }
    }, []);

    return (
        <div className=" mt-4 px-4">
            <Tabs tabs={tabs?.data} contentClass={"md:mt-10 mt-6"}>
                <div id={1}>
                    <Products
                        isshowap={true}
                        products={data?.data?.product_list}
                    />
                </div>
                <div id={2}>
                    <Products
                        isshowap={true}
                        products={purchases?.data?.data[0]?.purchase_details}
                    />
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
