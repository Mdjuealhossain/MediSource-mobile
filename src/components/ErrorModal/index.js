"use client";
import { useEffect } from "react";
import Image from "next/image";

const AlartModal = ({
    message,
    isOpen,
    openModal,
    closeModal,
    success = false,
}) => {
    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => closeModal(), 2000);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    const image = success
        ? "/assets/icons/confirm.svg"
        : "/assets/icons/error.svg";

    return (
        <>
            {isOpen && (
                <div className=" fixed inset-0 flex items-center justify-center z-30">
                    <div
                        className="fixed inset-0 bg-[#0006] dark:bg-white/20"
                        onClick={closeModal}
                    ></div>
                    <div className=" px-6 py-12 bg-white z-50 rounded-2xl w-[250px]">
                        <div className=" flex items-center justify-center mb-4">
                            <Image
                                src={image}
                                height={64}
                                width={64}
                                alt="confirm"
                                className=" h-10 w-10"
                            />
                        </div>
                        <h6 className=" text-H6 text-center font-bold text-warning_main leading-7">
                            {message}
                        </h6>
                    </div>
                </div>
            )}
        </>
    );
};

export default AlartModal;
