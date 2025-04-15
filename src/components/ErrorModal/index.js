"use client";
import { useEffect } from "react";
import Image from "next/image";

const AlartModal = ({ message, isOpen, openModal, closeModal, success = false }) => {
    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => closeModal(), 500);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    const image = success ? "/assets/icons/confirm.svg" : "/assets/icons/error.svg";

    return (
        <>
            {isOpen && (
                <div className=" fixed inset-0 flex items-center justify-center z-30">
                    <div className="fixed inset-0 bg-[rgba(0,0,0,.4)]" onClick={closeModal}></div>
                    <div className=" px-4 py-6 bg-white z-50 rounded-lg w-[180px]">
                        <div className=" flex items-center justify-center mb-4">
                            <Image src={image} height={64} width={64} alt="confirm" className=" h-8 w-8" />
                        </div>
                        <h6 className=" text-subtitle1 text-center font-semibold leading-5 text-warning_main">{message}</h6>
                    </div>
                </div>
            )}
        </>
    );
};

export default AlartModal;
