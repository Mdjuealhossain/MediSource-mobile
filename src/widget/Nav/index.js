"use client";
import { useEffect, useState, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";

import { useTab } from "@/app/contexApi";
import FilteredDrawer from "../FilteredDrawer";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab, title } = useTab();
    const [isSearch, setIsSearch] = useState(false);
    const { isData } = useTab();

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <>
            <div>
                <nav className={`flex items-center z-0 ${isSearch ? " justify-center" : " justify-between"} px-4 py-3 bg-success_main text-white`}>
                    <p className={`${isSearch ? "hidden" : "inline-block"} text-subtitle1 capitalize`}>
                        Total {title} =<span className="font-semibold pl-1">{parseFloat((isData || 0).toFixed(2))}</span>
                    </p>

                    <div className={`flex items-center gap-4 ${isSearch ? "hidden" : "inline-block"}`}>
                        <span onClick={toggleDrawer} className=" cursor-pointer">
                            <BsFilterRight size={24} />
                        </span>
                    </div>
                </nav>
            </div>
            <FilteredDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} direction="right" />
        </>
    );
};

export default Nav;
