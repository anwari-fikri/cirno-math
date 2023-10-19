import React, { useState } from "react";
import { observer } from "mobx-react";
import ConfigStore from "../interfaces/ConfigStore";

const SelectDifficulty = observer(() => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<
        "easy" | "normal" | "hard"
    >(ConfigStore.playDifficulty);

    const handleDifficultySelection = (
        difficultyValue: "easy" | "normal" | "hard"
    ) => {
        setSelectedDifficulty(difficultyValue);
        ConfigStore.handleSetPlayDifficulty(difficultyValue);
    };

    return (
        <div>
            <button
                onClick={() => handleDifficultySelection("easy")}
                className={`font-bold p-2 hover:text-white ${
                    selectedDifficulty === "easy"
                        ? "text-blue-300"
                        : "text-gray-600"
                }`}
            >
                Easy
            </button>
            <button
                onClick={() => handleDifficultySelection("normal")}
                className={`font-bold p-2 hover:text-white ${
                    selectedDifficulty === "normal"
                        ? "text-blue-300"
                        : "text-gray-600"
                }`}
            >
                Normal
            </button>
            <button
                onClick={() => handleDifficultySelection("hard")}
                className={`font-bold p-2 hover:text-white ${
                    selectedDifficulty === "hard"
                        ? "text-blue-300"
                        : "text-gray-600"
                }`}
            >
                Hard
            </button>
        </div>
    );
});

export default SelectDifficulty;
