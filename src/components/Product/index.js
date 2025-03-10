import { useState } from "react";

import useModal from "@/app/hooks/useModal";
import PurchaseModal from "./PurcheaseModal";

const Product = ({ item, index, onDelete, isshowap = false }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const [swipePosition, setSwipePosition] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [startX, setStartX] = useState(0);
    const swipeThreshold = 100;

    // swipe system will only work if isshowap is true
    const handleTouchStart = (e) => {
        if (isshowap) {
            // Only work if isshowap is true
            setIsSwiping(true);
            setStartX(e.touches[0].clientX);
        }
    };

    const handleTouchMove = (e) => {
        if (isshowap && isSwiping) {
            // Only work if isshowap is true
            const deltaX = e.touches[0].clientX - startX;
            setSwipePosition(Math.min(Math.max(deltaX, -200), 0)); // Limit to negative max value
        }
    };

    const handleTouchEnd = () => {
        if (isshowap) {
            // Only work if isshowap is true
            setIsSwiping(false);
            if (swipePosition < -swipeThreshold) {
                onDelete(item.product_id); // Delete item
            }
            setTimeout(() => setSwipePosition(0), 200); // Delay before resetting position
        }
    };

    const handleMouseDown = (e) => {
        if (isshowap) {
            // Only work if isshowap is true
            setIsSwiping(true);
            setStartX(e.clientX);
        }
    };

    const handleMouseMove = (e) => {
        if (isshowap && isSwiping) {
            // Only work if isshowap is true
            const deltaX = e.clientX - startX;
            setSwipePosition(Math.min(Math.max(deltaX, -200), 0)); // Limit to negative max value
        }
    };

    const handleMouseUp = () => {
        if (isshowap) {
            // Only work if isshowap is true
            setIsSwiping(false);
            if (swipePosition < -swipeThreshold) {
                onDelete(item.product_id); // Delete item
            }

            setTimeout(() => setSwipePosition(0), 200);
        }
    };

    const deleteButtonVisible = swipePosition < -swipeThreshold;

    const rate = item.rate - (item.rate * 4) / 100;
    const amount = rate * item.total_qty;

    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div
                    onClick={openModal}
                    className="flex items-center gap-1 w-full"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ transform: `translateX(${swipePosition}px)` }}
                >
                    <p className="font-medium text-subtitle1">{index + 1}.</p>
                    <div className="px-3 py-2 rounded border border-gary_700 w-full bg-paper">
                        <h6 className="text-H6 font-medium mb-1">
                            {item.name || "Unknown name"}
                        </h6>
                        <div className="flex items-center gap-0.5">
                            <p className="text-body2">
                                Qty:
                                <span className="font-semibold pl-1">
                                    {item.total_qty}
                                </span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                R:
                                <span className="font-semibold pl-1">
                                    {parseFloat((rate || 0).toFixed(1))}
                                    TK
                                </span>
                            </p>
                            <span className="px-1">|</span>
                            <p className="text-body2">
                                A:
                                <span className="font-semibold pl-1">
                                    {parseFloat((amount || 0).toFixed(1))}
                                    TK
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {deleteButtonVisible && (
                    <p className="text-subtitle2 text-red-600 font-semibold mr-8">
                        Short
                    </p>
                )}
            </div>
            <PurchaseModal
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
                data={item.name}
            />
        </>
    );
};

export default Product;
