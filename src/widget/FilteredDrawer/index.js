"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });
import { DtPicker } from "react-calendar-datetime-picker";
import { IoMdClose } from "react-icons/io";
import Select from "@/components/Select";

import useGetDistrict from "@/app/hooks/useDistrict";
import { clearCookie } from "@/app/utilities/cookies";
import useUserList from "@/app/hooks/useUserList";
import { useTab } from "@/app/contexApi";
import useArea from "@/app/hooks/useArea";
import "react-calendar-datetime-picker/dist/style.css";
import "react-modern-drawer/dist/index.css";

const FilteredDrawer = ({ isOpen, toggleDrawer, direction }) => {
    const { data } = useGetDistrict();
    const { data: areaData } = useArea();
    const { isFilterData, setIsFilterData } = useTab();
    const [search, setSearch] = React.useState("");
    const params = {
        search: search,
        pagination: 5000,
    };

    const { data: user } = useUserList(params);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset, // <-- Add this line to access reset function
    } = useForm({
        defaultValues: {
            district: null,
            area: null,
            date: null,
            user: null,
        },
    });

    const [formState, setFormState] = React.useState(null); // <-- Store form state

    // useEffect(() => {
    //     if (isOpen && formState) {
    //         reset(formState); // <-- Restore form values when the drawer is opened
    //     }
    // }, [isOpen, formState, reset]);
    // if (!isOpen) return null;

    const onSubmit = (data) => {
        setIsFilterData(data);
        setFormState(data); // <-- Store form state on submit
        toggleDrawer();
    };

    useEffect(() => {
        if (!isOpen) {
            setFormState(null); // Reset form state when drawer is closed, but form won't reset
        }
    }, [isOpen]);

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            clearCookie("authToken"); // Replace "user" with your actual cookie name

            window.location.href = "/login";
        }
    };

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction={direction}
            className="!w-[80%]"
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
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Pharmacy</label>
                            <Controller
                                name="user"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        placeholder="Select user"
                                        multipleValu={false}
                                        onChange={(val) => field.onChange(val)}
                                        options={user?.data?.data}
                                        onSearch={(val) => setSearch(val)}
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
                    <button
                        type="button"
                        onClick={logout}
                        className="cursor-pointer w-full px-4 mt-4 py-2 text-subtitle2 bg-warning_main text-white rounded"
                    >
                        logout
                    </button>
                </form>
            </div>
        </Drawer>
    );
};

export default FilteredDrawer;
