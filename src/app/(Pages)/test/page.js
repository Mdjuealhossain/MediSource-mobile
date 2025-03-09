"use client";
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    const handleClick = () => {
        setTimeout(() => {
            setCount((prev) => prev + 1);
            setText("Updated");
        }, 1000);
    };

    console.log("count---", count);
    console.log("text---", text);

    return (
        <div>
            <p>Count: {count}</p>
            <p>Text: {text}</p>
            <button onClick={handleClick}>Update</button>
        </div>
    );
}

export default App;
