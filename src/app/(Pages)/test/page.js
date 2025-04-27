"use client";
import { decrement, increment } from "@/app/utilities/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);

    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <h1 className="text-2xl font-bold">Counter: {count}</h1>
            <div className="flex space-x-4 mt-4">
                <button onClick={() => dispatch(increment())} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Increment
                </button>
                <button onClick={() => dispatch(decrement())} className="bg-red-500 text-white py-2 px-4 rounded">
                    Decrement
                </button>
            </div>
        </div>
    );
}
