import React, { useState } from "react";

const PurchaseModal = ({ onReturn, isOpen, closeModal, qnt, placeholder = "Return" }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const inputNum = parseFloat(value);
        const qntNum = parseFloat(qnt);

        if (!isNaN(inputNum) && inputNum > qntNum) {
            setError(`Cannot be greater than quantity (${qnt})`);
        } else {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (error || inputValue === "") return;

        onReturn(inputValue);
        closeModal();
        setInputValue("");
        setError("");
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-30 mx-4">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <form onSubmit={handleSubmit} className="p-2 bg-white z-50 rounded-md w-[150px] flex flex-col items-center justify-center">
                        <input value={inputValue} onChange={handleChange} placeholder={placeholder} className={`text-subtitle2 placeholder:text-subtitle2 w-full outline-none border rounded px-4 py-[3px] ${error ? "border-red-500" : ""}`} />
                        <div className="w-full mt-2">
                            <button type="submit" disabled={!!error || inputValue === ""} className={`text-body2 w-full font-medium px-4 py-1.5 rounded text-white capitalize ${error ? "bg-gray-400 cursor-not-allowed" : "bg-success_main"}`}>
                                add
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default PurchaseModal;
