import React from "react";

const Home = () => {
    return (
        <div className=" mt-12 px-4">
            <h3 className=" text-H4 font-semibold mb-4">Sold Products List</h3>
            <div className=" flex items-center gap-1">
                <p className=" font-medium text-subtitle1">1.</p>
                <div className=" px-3 py-2 rounded border border-gary_700 flex justify-between w-full">
                    <div>
                        <h6 className=" text-H6 font-medium mb-1">
                            Amdocal plus 25mg
                        </h6>
                        <div className=" flex items-center gap-0.5">
                            <p>Qty: 1</p> <span className=" px-1">|</span>
                            <p>R: 123.00 TK</p>
                            <span className=" px-1">|</span>
                            <p>A: 172.00Tk</p>
                        </div>
                    </div>
                    <div>
                        <button className=" px-2 py-1 bg-success_main text-white text-subtitle2">
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
