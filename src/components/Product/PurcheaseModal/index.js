import React from "react";

const PurchaseModal = ({ data, isOpen, closeModal }) => {
    return (
        <>
            {isOpen && (
                <div className=" fixed inset-0 flex items-center justify-center z-30 mx-4">
                    <div
                        className="fixed inset-0 bg-[#0006] dark:bg-white/20"
                        onClick={closeModal}
                    ></div>
                    <div className=" p-2 bg-white z-50 rounded-md w-[150px] flex flex-col items-center justify-center">
                        <div className=" flex items-center justify-center gap-1 mb-1">
                            <input className=" text-subtitle2 w-full outline-none focus:outline-none border rounded px-4 py-[3px]" />
                        </div>
                        <div className="w-full mt-2">
                            <button
                                onClick={closeModal}
                                className=" text-body2 w-full font-medium px-4 py-1.5 rounded text-white bg-success_main capitalize"
                            >
                                add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PurchaseModal;
