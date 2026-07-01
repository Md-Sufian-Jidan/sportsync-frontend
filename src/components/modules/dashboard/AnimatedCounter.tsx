import { useEffect, useState } from "react";

export function useAnimatedCounter(target: number, isInView: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const increment = target > 100 ? Math.ceil(target / 60) : 1;
        const interval = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else setCount(start);
        }, Math.abs(Math.floor(1500 / (target / increment))));
        return () => clearInterval(interval);
    }, [target, isInView]);
    return count;
}