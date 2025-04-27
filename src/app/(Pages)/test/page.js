"use client";
import { useTab } from "@/app/contexApi";
import { useEffect, useState } from "react";

const ReportPage = () => {
    const { isFilterData } = useTab();
    // const [filterData, setFilterData] = useState({
    //     date: "",
    //     district: null,
    //     area: null,
    // });

    // useEffect(() => {
    //     const storedData = JSON.parse(localStorage.getItem("filterData"));
    //     if (storedData) {
    //         setFilterData({
    //             date: storedData.date,
    //             district: storedData.district,
    //             area: storedData.area,
    //         });
    //     }
    // }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Selected Filter Data</h2>
            <p>
                <strong>Date:</strong> {isFilterData.date}
            </p>
            <p>
                <strong>District:</strong> {isFilterData.district?.label}
            </p>
            <p>
                <strong>Area:</strong> {isFilterData.area?.label}
            </p>
        </div>
    );
};

export default ReportPage;
