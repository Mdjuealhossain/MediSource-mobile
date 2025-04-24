"use client";
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

// CartProvider will wrap the components that need to access the activeTab
export function ProductProvider({ children }) {
    const [purchases, setPurchases] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [isData, setIsData] = useState(null);
    const [isFilterData, setIsFilterData] = useState({});
    const [isPurchase, setIsPurchase] = useState(false);
    const [dontReceived, setDontReceived] = useState([]);
    const [isSpecial, setIsSpecial] = useState(false);
    const [isShort, setIsShort] = useState("");

    const [title, setTitle] = useState("");

    const toggleIsPs = (id) => {
        setPurchases((prev) => {
            const updated = prev.map((item) => (item.product_id === id ? { ...item, isPs: !item.isPs } : item));
            const isPsMap = {};
            updated.forEach((item) => {
                isPsMap[item.product_id] = item.isPs;
            });
            localStorage.setItem("isPsMap", JSON.stringify(isPsMap));

            return updated;
        });
    };

    const initializePurchases = (productList) => {
        const storedIsPsMap = JSON.parse(localStorage.getItem("isPsMap") || "{}");

        const filtered = productList
            ?.filter((item) => item.buying_price > 0 && item.is_dr !== "1")
            .map((item) => ({
                ...item,
                isPs: storedIsPsMap[item.product_id] || false,
            }));

        // const final_filtered

        setPurchases(filtered);
    };

    return (
        <ProductContext.Provider
            value={{
                activeTab,
                setActiveTab,
                isData,
                setIsData,
                isFilterData,
                setIsFilterData,
                isPurchase,
                setIsPurchase,
                dontReceived,
                setDontReceived,
                isShort,
                setIsShort,
                title,
                setTitle,
                purchases,
                initializePurchases,
                toggleIsPs,
                isSpecial,
                setIsSpecial,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

// Custom hook to access activeTab state and setActiveTab function
export function useTab() {
    return useContext(ProductContext);
}
