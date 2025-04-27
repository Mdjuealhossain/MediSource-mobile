"use client";

import { setAllSums } from "@/app/utilities/sumSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
    const sums = useSelector((state) => state.sums); // Get sums from Redux store
    const dispatch = useDispatch();

    // Use useEffect to dispatch the action when the component mounts
    useEffect(() => {
        // Dispatch the action to update sums on component mount
        dispatch(
            setAllSums({
                totalDiscountedAmountAllorde: 500,
                purchaseTotalAmountSum: 800,
                PsTotalAmountSum: 300,
                totalDiscountedAmountAllShort: 200,
                purchaseTotalAmountSumIsSpecial: 150,
                returnedSum: 50,
                totalStockAmount: 700,
            })
        );
    }, [dispatch]);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Sum Values</h1>
            <ul className="list-disc pl-6">
                {Object.entries(sums).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
