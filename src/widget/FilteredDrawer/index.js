"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });
import { DtPicker } from "react-calendar-datetime-picker";
import { IoMdClose } from "react-icons/io";
import Select from "@/components/Select";

import useGetDistrict from "@/app/hooks/useDistrict";
import { useTab } from "@/app/contexApi";
import useArea from "@/app/hooks/useArea";
import "react-calendar-datetime-picker/dist/style.css";
import "react-modern-drawer/dist/index.css";

const FilteredDrawer = ({ isOpen, toggleDrawer, direction }) => {
    const { data } = useGetDistrict();
    const { data: areaData } = useArea();
    const { isFilterData, setIsFilterData } = useTab();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            district: null,
            area: null,
            date: null,
        },
    });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    const onSubmit = (data) => {
        setIsFilterData(data);
        toggleDrawer();
    };

    if (!isOpen) return null;

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction={direction}
            className=" !w-[80%]"
        >
            <div className="h-full bg-secondary_bg">
                <div className="bg-white mb-4">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h6 className="text-H6 font-semibold">Filters</h6>
                        <span onClick={toggleDrawer} className="cursor-pointer">
                            <IoMdClose size={24} />
                        </span>
                    </div>
                </div>
                <form className="px-4 py-2" onSubmit={handleSubmit(onSubmit)}>
                    {/* Date Picker */}

                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Date</label>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DtPicker
                                        {...field}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        calendarType="US"
                                        placeholder="Select a date"
                                        inputClass="!py-2 !h-[34px] custom-input  !px-4 w-full rounded bg-white ring-gary_700 text-black   bg-gray_500 text-body2 focus:ring-1 focus:ring-gary_700 focus:outline-none ring-1"
                                    />
                                )}
                            />
                        </div>
                        {/* District Select */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">District</label>
                            <Controller
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        placeholder="Select One"
                                        multipleValu={false}
                                        onChange={(val) => field.onChange(val)}
                                        options={data?.data}
                                        overlyClass="!bg-transparent"
                                        inputClass="py-2  px-4 w-full rounded bg-white ring-gary_700 text-black bg-gray_500 text-body2 focus:ring-1 focus:ring-gary_700 focus:outline-none ring-1"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2 ">
                            <label className="font-semibold">Area</label>
                            <Controller
                                name="area"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        placeholder="Select One"
                                        multipleValu={false}
                                        onChange={(val) => field.onChange(val)}
                                        options={areaData?.data}
                                        overlyClass="!bg-transparent"
                                        inputClass="py-2  px-4 w-full rounded bg-white ring-gary_700 text-black bg-gray_500 text-body2 focus:ring-1 focus:ring-gary_700 focus:outline-none ring-1"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full px-4 py-2 text-subtitle2 bg-success_main text-white rounded"
                    >
                        Search
                    </button>
                </form>
            </div>
        </Drawer>
    );
};

export default FilteredDrawer;
