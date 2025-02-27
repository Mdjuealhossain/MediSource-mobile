"use client";
import { useEffect, useState, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";

import FilteredDrawer from "../FilteredDrawer";
import { tabContentas } from "@/app/data";
import { useTab } from "@/app/contexApi";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab } = useTab();
    const [isSearch, setIsSearch] = useState(false);
    console.log("----", isSearch);

    const searchRef = useRef(null);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const item_catagories = tabContentas.find((data) => data.id == activeTab);

    const calagory =
        item_catagories?.catagory === "All"
            ? "Purchase"
            : item_catagories?.catagory || "All Category";

    // Open search field when search icon is clicked
    const openSearch = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event propagation to prevent triggering closeSearch
        setIsSearch(true); // Show the search input
    };

    // Close the search field when clicking outside of it
    const closeSearch = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsSearch(false); // Hide the search input if clicked outside
        }
    };

    useEffect(() => {
        // Add event listener only when the search input is open
        if (isSearch) {
            const handleClickOutside = (e) => {
                if (
                    searchRef.current &&
                    !searchRef.current.contains(e.target)
                ) {
                    setIsSearch(false); // Hide the search input if clicked outside
                }
            };

            document.addEventListener("click", handleClickOutside);

            // Cleanup the event listener when the component is unmounted or search is closed
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    }, [isSearch]); // Re-run the effect when `isSearch` changes

    return (
        <>
            <div>
                <nav
                    className={`flex items-center z-0 ${
                        isSearch ? " justify-center" : " justify-between"
                    } px-4 py-3 bg-success_main text-white`}
                >
                    <p className={`${isSearch ? "hidden" : "inline-block"}`}>
                        {calagory} =
                        <span className=" font-semibold pl-1">
                            {item_catagories?.products?.length || 0}
                        </span>
                    </p>

                    {isSearch && (
                        <input
                            ref={searchRef}
                            className="text-subtitle2 bg-white/10 w-48 outline-none focus:outline-none border rounded px-4 py-[2px]"
                            autoFocus // Automatically focus on the input field when opened
                        />
                    )}

                    <div
                        className={`flex items-center gap-4 ${
                            isSearch ? "hidden" : "inline-block"
                        }`}
                    >
                        <span
                            className={`${
                                isSearch ? "hidden" : "inline-block"
                            }`}
                            onClick={openSearch} // Show search input when icon is clicked
                        >
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
