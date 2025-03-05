"use client";
import { useEffect } from "react";

import { getFormattedDates } from "../utilities/getFormattedDates";
import useProducts from "../hooks/useProducts";
import Products from "@/widget/Products";
import { useTab } from "../contexApi";
import Tabs from "@/components/Tabs";

const Home = () => {
    const { isData, setIsData, isFilterData } = useTab();
    const { presentDay, prevDay } = getFormattedDates(isFilterData?.date);
    const params = {
        district: isFilterData?.district?.id,
        area: isFilterData?.area?.id,
        percentage: 4,
        pagination: 5000,
        from_date: prevDay,
        from_time: encodeURIComponent("08:00"),
        to_date: presentDay,
        to_time: encodeURIComponent("17:59:59"),
    };
    const { data, loading, error } = useProducts(params);
    useEffect(() => {
        setIsData(data?.data?.product_list);
    });
    return (
        <div className=" mt-4 px-4">
            <Tabs tabs={tabs?.data} contentClass={"md:mt-10 mt-6"}>
                <div id={1}>
                    <Products
                        isshowap={true}
                        products={data?.data?.product_list}
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
