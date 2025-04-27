"use client";
import { Provider } from "react-redux"; // Redux Provider
import { Poppins } from "next/font/google";
import { ProductProvider } from "./contexApi"; // Your custom context

import "./globals.css";
import store from "./utilities/store";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body className="font-poppins">
                {/* First Redux Provider */}
                <Provider store={store}>
                    {/* Then your custom context */}
                    <ProductProvider>{children}</ProductProvider>
                </Provider>
            </body>
        </html>
    );
}
