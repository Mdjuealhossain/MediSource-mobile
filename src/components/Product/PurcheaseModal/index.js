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
                    <div className=" p-4 bg-white z-50 rounded-lg w-[400px]">
                        <h5 className=" text-H6 text-center font-semibold text-warning_main leading-7 capitalize mb-2">
                            add purchase
                        </h5>
                        <input className=" text-subtitle2 w-full outline-none focus:outline-none border rounded px-4 py-2" />
                        <div className=" flex items-center justify-center mt-2">
                            <button
                                onClick={closeModal}
                                className=" text-subtitle2 font-medium px-6 py-1 rounded text-white bg-success_main capitalize"
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
