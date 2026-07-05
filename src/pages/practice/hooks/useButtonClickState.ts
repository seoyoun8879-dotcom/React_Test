import { useState } from "react";

function useButtonCLickState() {
    const [count, setCount] = useState([0, 0, 0]);

    const handleButtonClickCount = (idx: number) => {
        setCount((prev) => prev.map((count, i) => (i === idx ? count + 1 : count)));
    };

    const handleButtonClickCountReset = () => {
        setCount([0, 0, 0]);
    };

    return {
        count,
        handleButtonClickCount,
        handleButtonClickCountReset
    }
}

export default useButtonCLickState;