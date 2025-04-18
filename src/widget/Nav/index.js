"use client";
import { useEffect, useState, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";

import { tabContentas } from "@/app/data";
import { useTab } from "@/app/contexApi";
import FilteredDrawer from "../FilteredDrawer";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab, title } = useTab();
    const [isSearch, setIsSearch] = useState(false);
    const { isData } = useTab();

    const searchRef = useRef(null);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const openSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSearch(true);
    };

    useEffect(() => {
        // Add event listener only when the search input is open
        if (isSearch) {
            const handleClickOutside = (e) => {
                if (searchRef.current && !searchRef.current.contains(e.target)) {
                    setIsSearch(false); // Hide the search input if clicked outside
                }
            };

            document.addEventListener("click", handleClickOutside);

            // Cleanup the event listener when the component is unmounted or search is closed
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    }, [isSearch]);

    return (
        <>
            <div>
                <nav className={`flex items-center z-0 ${isSearch ? " justify-center" : " justify-between"} px-4 py-3 bg-success_main text-white`}>
                    <p className={`${isSearch ? "hidden" : "inline-block"} text-subtitle1 capitalize`}>
                        Total {title} =<span className="font-semibold pl-1">{parseFloat((isData || 0).toFixed(2))}</span>
                    </p>

                    {isSearch && (
                        <input
                            ref={searchRef}
                            className="text-subtitle2 bg-white/10 w-48 outline-none focus:outline-none border rounded px-4 py-[2px]"
                            autoFocus // Automatically focus on the input field when opened
                        />
                    )}

                    <div className={`flex items-center gap-4 ${isSearch ? "hidden" : "inline-block"}`}>
                        <span
                            className={`${isSearch ? "hidden" : "inline-block"} cursor-pointer`}
                            onClick={openSearch} // Show search input when icon is clicked
                        >
                            <MdOutlineSearch size={24} />
                        </span>
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
