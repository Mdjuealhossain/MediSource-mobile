"use client";
import Product from "@/components/Product";
import Products from "@/widget/Products";
import { useState } from "react";

const Home = () => {
    const [activeTab, setActiveTab] = useState(tabs?.data[0].id);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className=" mt-10 px-4">
            <h3 className=" text-H4 font-semibold mb-4 text-center">
                Sold Products List
            </h3>
            <div
                className={`flex justify-center mb-6  items-center  gap-2 whitespace-nowrap md:scroll-container overflow-x-auto no-scrollbar`}
            >
                {tabs?.data.map((tab) => (
                    <span
                        key={tab.id}
                        className={` py-1.5 px-3 w-[72px] capitalize font-medium cursor-pointer text-subtitle2 flex items-center justify-center rounded-md border border-success_main transition-all duration-400 focus:outline-none ${
                            activeTab === tab.id
                                ? " bg-success_main hover:bg-success_dark text-white"
                                : ` bg-white text-primary`
                        }`}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        <span>{tab.name}</span>
                    </span>
                ))}
            </div>
            <Products />
        </div>
    );
};

export default Home;
const tabs = {
    data: [
        { id: 1, name: "All" },
        { id: 2, name: "Purchase" },
        { id: 3, name: "Short" },
        { id: 4, name: "Trending" },
    ],
};
