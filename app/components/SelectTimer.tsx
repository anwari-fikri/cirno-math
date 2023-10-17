import React, { useState } from "react";
import { observer } from "mobx-react";
import ConfigStore from "../interfaces/ConfigStore";

const SelectTimer = observer(() => {
    const [selectedTimer, setSelectedTimer] = useState<30 | 60 | 120>(
        ConfigStore.playTimer
    );

    const handleTimerSelection = (timerValue: 30 | 60 | 120) => {
        setSelectedTimer(timerValue);
        ConfigStore.handleSetPlayTimer(timerValue);
    };

    return (
        <div>
            <button
                onClick={() => handleTimerSelection(30)}
                className={`font-bold p-2 hover:text-white ${
                    selectedTimer === 30 ? "text-blue-300" : "text-gray-600"
                }`}
            >
                30s
            </button>
            <button
                onClick={() => handleTimerSelection(60)}
                className={`font-bold p-2 hover:text-white ${
                    selectedTimer === 60 ? "text-blue-300" : "text-gray-600"
                }`}
            >
                60s
            </button>
            <button
                onClick={() => handleTimerSelection(120)}
                className={`font-bold p-2 hover:text-white ${
                    selectedTimer === 120 ? "text-blue-300" : "text-gray-600"
                }`}
            >
                120s
            </button>
        </div>
    );
});

export default SelectTimer;
