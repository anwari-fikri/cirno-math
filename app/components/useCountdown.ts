import { useState, useEffect } from "react";

export default function useCountdown() {
    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [countdownEnd, setCountdownEnd] = useState<boolean>(false);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setCountdownEnd(true);
            return;
        }

        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft]);

    function startCountdown(seconds: number) {
        setSecondsLeft(seconds);
        setCountdownEnd(false); // Reset countdownEnd when starting a new countdown
    }

    return { secondsLeft, countdownEnd, startCountdown };
}
