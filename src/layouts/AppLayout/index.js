import Nav from "@/widget/Nav";
import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div className=" relative">
            <Nav />
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;
