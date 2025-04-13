"use client";
import { useTab } from "@/app/contexApi";
import React, { useEffect } from "react";

const Tabs = ({ tabs = [], children, tabContainerClass, contentClass }) => {
    const { activeTab, setActiveTab } = useTab();

    useEffect(() => {
        if (!activeTab && tabs.length > 0) {
            setActiveTab(tabs[0]?.value);
        }
    }, [activeTab, setActiveTab, tabs]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-center">
                <div className={`flex items-center max-sm:justify-start sm:justify-center md:gap-4 gap-2 ${tabContainerClass} overflow-x-auto no-scrollbar`}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.value)}
                            className={`py-1.5 px-3 w-[72px] capitalize whitespace-nowrap font-medium cursor-pointer text-subtitle2 flex items-center justify-center rounded-md border border-success_main transition-all duration-400 focus:outline-none ${activeTab === tab.value ? "bg-success_main hover:bg-success_dark text-white" : "bg-white text-primary"}`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${contentClass}`}>{React.Children.map(children, (child) => (child.props.value === activeTab ? child : null))}</div>
        </div>
    );
};

export default Tabs;
