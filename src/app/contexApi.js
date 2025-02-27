"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context to share the active tab state
const ProductContext = createContext();

// CartProvider will wrap the components that need to access the activeTab
export function ProductProvider({ children }) {
    const [activeTab, setActiveTab] = useState(null); // Store activeTab state here

    return (
        <ProductContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ProductContext.Provider>
    );
}

// Custom hook to access activeTab state and setActiveTab function
export function useTab() {
    return useContext(ProductContext);
}
