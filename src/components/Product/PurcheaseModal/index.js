import React from "react";

const PurchaseModal = ({ data, isOpen, closeModal }) => {
    return (
        <>
            {isOpen && (
                <div className=" fixed inset-0 flex items-center justify-center z-30">
                    <div
                        className="fixed inset-0 bg-[#0006] dark:bg-white/20"
                        onClick={closeModal}
                    ></div>
                    <div className=" px-6 py-8 bg-white z-50 rounded-lg w-[400px]">
                        <h5 className=" text-H5 text-center font-bold text-warning_main leading-7">
                            {data}
                        </h5>
                    </div>
                </div>
            )}
        </>
    );
};

export default PurchaseModal;
