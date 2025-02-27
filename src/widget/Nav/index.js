"use client";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import FilteredDrawer from "../FilteredDrawer";

import { tabContentas } from "@/app/data";
import { useTab } from "@/app/contexApi";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab } = useTab();

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const item_catagories = tabContentas.find((data) => data.id == activeTab);

    // Safe check for item_catagories being undefined
    const calagory =
        item_catagories?.catagory === "All" // Optional chaining to prevent accessing undefined
            ? "Purchase"
            : item_catagories?.catagory || "All Category"; // Fallback value in case catagory is undefined

    return (
        <>
            <div>
                <nav className=" flex items-center justify-between px-4 py-3 bg-success_main text-white">
                    <p>
                        {calagory} =
                        <span className=" font-semibold pl-1">
                            {item_catagories?.products?.length || 0}{" "}
                            {/* Safe access to products */}
                        </span>
                    </p>
                    <div className=" flex items-center gap-4 ">
                        <span>
                            <MdOutlineSearch size={24} />
                        </span>
                        <span onClick={toggleDrawer}>
                            <BsFilterRight size={24} />
                        </span>
                    </div>
                </nav>
            </div>
            <FilteredDrawer
                isOpen={isOpen}
                toggleDrawer={toggleDrawer}
                direction="right"
            />
        </>
    );
};

export default Nav;
