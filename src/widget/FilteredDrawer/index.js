"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { DtPicker } from "react-calendar-datetime-picker";

import useGetDistrict from "@/app/hooks/useDistrict";
import useUserList from "@/app/hooks/useUserList";
import useArea from "@/app/hooks/useArea";
import { useTab } from "@/app/contexApi";
import { clearCookie } from "@/app/utilities/cookies";

import "react-calendar-datetime-picker/dist/style.css";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";

const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });

const FilteredDrawer = ({ isOpen, toggleDrawer, direction }) => {
    const { data: districtData } = useGetDistrict();
    const { data: areaData } = useArea();
    const [search, setSearch] = useState("");
    const { data: userData } = useUserList({ search, pagination: 5000 });
    const { setIsFilterData, isFilterData } = useTab();

    console.log("isFilterData--", isFilterData);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            date: "",
            district: null,
            area: null,
            user: null,
        },
    });

    const district_options = districtData?.data?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const area_options = [
        { value: "all", label: "All Areas" },
        ...(Array.isArray(areaData?.data)
            ? areaData.data.map((item) => ({
                  value: item.id,
                  label: item.name,
              }))
            : []),
    ];

    const user_options = userData?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const updateLocalStorage = (formData) => {
        localStorage.setItem("filterData", JSON.stringify(formData));
    };

    const onSubmit = (formData) => {
        toggleDrawer();
        updateLocalStorage(formData);
        setIsFilterData(formData);
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            clearCookie("authToken");
            window.location.href = "/login";
        }
    };

    const handleChange = (name, value) => {
        setValue(name, value); // only setValue, no localStorage update
    };

    useEffect(() => {
        if (districtData?.data?.length && areaData?.data?.length) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayISO = yesterday.toISOString().split("T")[0];

            const defaultDistrict = districtData.data.find((item) => item.name === "Dhaka");
            const defaultArea = areaData.data[0];

            const savedData = JSON.parse(localStorage.getItem("filterData"));

            console.log("savedData---", savedData);

            if (savedData) {
                setValue("date", savedData.date || yesterdayISO);
                setValue("district", savedData.district);
                setValue("area", savedData.area);
                setValue("user", savedData.user);

                setIsFilterData(savedData);
            } else {
                const defaultFormData = {
                    date: yesterdayISO,
                    district: defaultDistrict ? { value: defaultDistrict.id, label: defaultDistrict.name } : null,
                    area: defaultArea ? { value: defaultArea.id, label: defaultArea.name } : null,
                    user: null,
                };

                setValue("date", defaultFormData.date);
                setValue("district", defaultFormData.district);
                setValue("area", defaultFormData.area);
                setValue("user", defaultFormData.user);

                localStorage.setItem("filterData", JSON.stringify(defaultFormData));
                setIsFilterData(defaultFormData);
            }
        }
    }, [districtData, areaData, setValue]);

    return (
        <Drawer open={isOpen} onClose={toggleDrawer} direction={direction} className="!w-[80%]">
            <div className="h-full bg-secondary_bg">
                {/* Header */}
                <div className="bg-white mb-4">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h6 className="text-H6 font-semibold">Filters</h6>
                        <span onClick={toggleDrawer} className="cursor-pointer">
                            <IoMdClose size={24} />
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form className="px-4 py-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 mb-12">
                        {/* Date */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Date</label>

                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DtPicker
                                        {...field}
                                        value={field.value ? new Date(field.value + "T00:00:00") : new Date()}
                                        onChange={(val) => {
                                            if (val?.year && val?.month && val?.day) {
                                                const year = val.year;
                                                const month = String(val.month).padStart(2, "0");
                                                const day = String(val.day).padStart(2, "0");

                                                const formattedDate = `${year}-${month}-${day}`;
                                                field.onChange(formattedDate);
                                            }
                                        }}
                                        calendarType="US"
                                        placeholder="Select a date"
                                        inputClass="!py-2 !h-[34px] custom-input !px-4 w-full rounded bg-white ring-gary_700 text-black bg-gray_500 text-body2 focus:ring-1 focus:ring-gary_700 focus:outline-none ring-1"
                                    />
                                )}
                            />
                        </div>

                        {/* District */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">District</label>
                            <Controller
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={district_options}
                                        placeholder="Select District"
                                        onChange={(val) => {
                                            field.onChange(val);
                                            handleChange("district", val);
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* Area */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Area</label>
                            <Controller
                                name="area"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={area_options}
                                        placeholder="Select Area"
                                        onChange={(val) => {
                                            field.onChange(val);
                                            handleChange("area", val);
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* Pharmacy */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Pharmacy</label>
                            <Controller
                                name="user"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={user_options}
                                        placeholder="Select Pharmacy"
                                        onInputChange={(val) => setSearch(val)}
                                        onChange={(val) => {
                                            field.onChange(val);
                                            handleChange("user", val);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-3">
                        <button type="submit" className="cursor-pointer w-full px-4 py-2 text-subtitle2 bg-success_main text-white rounded">
                            Search
                        </button>
                        <Link href="/report" onClick={toggleDrawer} className="cursor-pointer w-full px-4 flex items-center justify-center py-2 text-subtitle2 bg-info_main text-white rounded">
                            Report
                        </Link>
                        <button type="button" onClick={logout} className="cursor-pointer w-full px-4 py-2 text-subtitle2 bg-warning_main text-white rounded">
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default FilteredDrawer;
