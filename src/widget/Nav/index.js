"use client";
import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import FilteredDrawer from "../FilteredDrawer";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <>
            <div>
                <nav className=" flex items-center justify-between px-4 py-3 bg-success_main text-white">
                    <p>mediSource</p>
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
