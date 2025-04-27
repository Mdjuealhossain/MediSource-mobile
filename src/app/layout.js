"use client";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import { Poppins } from "next/font/google";

import { ProductProvider } from "./contexApi";

import "./globals.css";
import { store } from "./utilities/store";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // Add the weights you need
    variable: "--font-poppins", // Custom variable for Tailwind
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <Provider store={store}>
                <ProductProvider>
                    <body className="font-poppins">{children}</body>
                </ProductProvider>
            </Provider>
        </html>
    );
}
