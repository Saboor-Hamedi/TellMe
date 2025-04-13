import { useState } from "react";

export default function Counter() {
    
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)} className="rounded bg-blue-500 px-4 py-2 text-white">
                Increase
            </button>
            <button onClick={() => setCount(count > 0 ? count -1 : 0)} className="rounded bg-blue-500 px-4 py-2 text-white">
                Decrease
            </button>
            <h1>Counter: {count}</h1>
        </div>
    );
}
