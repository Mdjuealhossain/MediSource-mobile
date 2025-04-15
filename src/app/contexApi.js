"use client";
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

// CartProvider will wrap the components that need to access the activeTab
export function ProductProvider({ children }) {
    const [activeTab, setActiveTab] = useState(null);
    const [isData, setIsData] = useState(null);
    const [isFilterData, setIsFilterData] = useState({});
    const [isPurchase, setIsPurchase] = useState(false);
    const [dontReceived, setDontReceived] = useState([]);
    const [isShort, setIsShort] = useState("");
    const [title, setTitle] = useState("");

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
