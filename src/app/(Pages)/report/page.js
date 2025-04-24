"use client";
import React from "react";

import { useTab } from "@/app/contexApi";
import PurchaseModal from "@/components/PurchaseModal";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Report = () => {
    const { isFilterData, isSpecial } = useTab();
    const { isOpen, openModal, closeModal } = useModal();
    console.log("isFilterData---", isFilterData);
    const handleCosts = (value) => {
        console.log("value", value);
    };
    return (
        <>
            <div className=" py-6 px-4 relative">
                <button onClick={openModal} className=" px-2 py-1 bg-warning_main text-white  rounded absolute -top-9 right-14">
                    {isSpecial ? "1%" : " Cost +"}
                </button>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className=" font-semibold text-lg">Report</h2>
                    <Link href={"/"} className="px-2 py-1 bg-black/50 text-white rounded flex items-center justify-center gap-1">
                        Back <MdOutlineArrowRightAlt size={18} />
                    </Link>
                </div>
                <div className=" flex flex-col gap-2 pb-4 mb-12">
                    <div className=" flex items-center justify-between">
                        <p className=" text-base font-medium capitalize">distric</p>
                        <p className=" text-sm font-medium capitalize">{isFilterData?.district?.name}</p>
                    </div>
                    <div className=" flex items-center justify-between ">
                        <p className=" text-base font-medium capitalize">area</p>
                        <p className=" text-sm font-medium capitalize">{isFilterData?.area?.name}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-2 border-b border-black pb-2">
                    <div className=" flex items-center justify-between">
                        <p className=" text-sm  capitalize">total purchases</p>
                        <p className=" text-sm  capitalize">24555</p>
                    </div>
                    <div className=" flex items-center justify-between ">
                        <p className=" text-sm  capitalize">cost</p>
                        <p className=" text-sm  capitalize">2344</p>
                    </div>
                </div>
                <div className=" flex items-center justify-between pt-2">
                    <p className=" text-sm font-medium capitalize">total cost</p>
                    <p className=" text-sm font-medium   capitalize">53535354</p>
                </div>
            </div>
            <PurchaseModal onReturn={handleCosts} isOpen={isOpen} closeModal={closeModal} placeholder={"Enter cost"} />
        </>
    );
};

export default Report;
