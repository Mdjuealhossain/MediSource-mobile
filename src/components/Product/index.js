import React from "react";
import PurchaseModal from "./PurcheaseModal";
import useModal from "@/hooks/useModal";

const Product = ({ product, index }) => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <div onClick={openModal} className="flex items-center gap-1 w-full">
                <p className="font-medium text-subtitle1">{index + 1}.</p>
                <div className="px-3 py-2 rounded border border-gary_700 w-full ">
                    <h6 className="text-H6 font-medium mb-1">{product.name}</h6>
                    <div className="flex items-center gap-0.5">
                        <p className="text-body2">Qty: {product.quantity}</p>
                        <span className="px-1">|</span>
                        <p className="text-body2">
                            R: {product.regularPrice} TK
                        </p>
                        <span className="px-1">|</span>
                        <p className="text-body2">
                            A: {product.actualPrice} TK
                        </p>
                    </div>
                </div>
            </div>
            <PurchaseModal
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
                data={product.name}
            />
        </>
    );
};

export default Product;
