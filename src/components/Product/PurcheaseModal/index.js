import React from "react";

const PurchaseModal = ({ data, isOpen, closeModal }) => {
    return (
        <>
            {isOpen && (
                <div className=" fixed inset-0 flex items-center justify-center z-30 mx-4">
                    <div
                        className="fixed inset-0 bg-black/30"
                        onClick={closeModal}
                    ></div>
                    <div className=" p-2 bg-white z-50 rounded-md w-[150px] flex flex-col items-center justify-center">
                        <input
                            placeholder="Enter Purchase"
                            className=" text-subtitle2 placeholder:text-subtitle2 w-full outline-none focus:outline-none border rounded px-4 py-[3px]"
                        />
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
