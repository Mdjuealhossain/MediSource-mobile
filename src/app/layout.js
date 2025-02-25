import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // Add the weights you need
    variable: "--font-poppins", // Custom variable for Tailwind
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body className="font-poppins">{children}</body>
        </html>
    );
}
