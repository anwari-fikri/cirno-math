"use client";

import React, { useEffect, useState } from "react";
import ConfigMenu from "./components/ConfigMenu";
import ConfigStore from "./interfaces/ConfigStore";
import { observer } from "mobx-react";
import useCountdown from "./components/useCountdown";

const Home = observer(() => {
    const [isStart, setIsStart] = useState<boolean>(false);
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [operation, setOperation] = useState<"+" | "-" | "x" | "÷">("+");
    const [answer, setAnswer] = useState<string>("");
    const [score, setScore] = useState<number>(-1);

    const { secondsLeft, countdownEnd, startCountdown } = useCountdown();

    const handleRestartButton = () => {
        setIsStart(false);
        setScore(-1);
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = Number(e.target.value);
        setAnswer(e.target.value.replace(/\D/g, ""));

        if (!isStart && userAnswer === 0) {
            setIsStart(true);
            ConfigStore.handleChooseOperation();
            setOperation(ConfigStore.selectedOperation);
            startCountdown(ConfigStore.playTimer);
        }

        const correctAnswer = calculateCorrectAnswer(
            operation,
            firstNumber,
            secondNumber
        );

        const generateNewNumber = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        if (userAnswer === correctAnswer) {
            ConfigStore.handleChooseOperation();
            // must do this or else division won't work IDK WHY
            const newOperation = ConfigStore.selectedOperation;
            setOperation(newOperation);
            setScore((prevScore) => prevScore + 1);
            //

            const first =
                ConfigStore.difficultyConfig[newOperation][
                    ConfigStore.playDifficulty
                ]["first"];

            const second =
                ConfigStore.difficultyConfig[newOperation][
                    ConfigStore.playDifficulty
                ]["second"];

            var newFirstNumber, newSecondNumber;
            switch (newOperation) {
                case "+":
                    newFirstNumber = generateNewNumber(first[0], first[1]);
                    newSecondNumber = generateNewNumber(second[0], second[1]);
                    break;
                case "-":
                    newFirstNumber = generateNewNumber(first[0], first[1]);
                    newSecondNumber = generateNewNumber(
                        second[0],
                        newFirstNumber
                    );
                    break;
                case "x":
                    newFirstNumber = generateNewNumber(first[0], first[1]);
                    newSecondNumber = generateNewNumber(second[0], second[1]);
                    break;
                case "÷":
                    newSecondNumber = generateNewNumber(second[0], second[1]);
                    newFirstNumber =
                        newSecondNumber * generateNewNumber(first[0], first[1]);
                    break;
                default:
                    newFirstNumber = 0;
                    newSecondNumber = 0;
                    break;
            }

            setFirstNumber(newFirstNumber);
            setSecondNumber(newSecondNumber);
            setAnswer("");
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-5">
            {!isStart && <ConfigMenu />}
            {secondsLeft > 0 && <p>{secondsLeft}</p>}

            {countdownEnd != isStart && (
                <>
                    <p className="text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                        {!isStart
                            ? "Press 0 to start"
                            : `${firstNumber} ${operation} ${secondNumber}`}
                    </p>
                    <div>
                        <input
                            className="text-black"
                            type="text"
                            value={answer}
                            onChange={handleAnswerChange}
                        />
                    </div>
                </>
            )}

            {isStart && countdownEnd && (
                <>
                    <p>Mode: {ConfigStore.availableOperations}</p>
                    <p>Score: {score}</p>
                    <button
                        onClick={handleRestartButton}
                        className="p-2 outline hover:bg-white hover:text-black"
                    >
                        Restart
                    </button>
                </>
            )}
        </div>
    );
});

const calculateCorrectAnswer = (
    operation: "+" | "-" | "x" | "÷",
    firstNumber: number,
    secondNumber: number
): number => {
    switch (operation) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "x":
            return firstNumber * secondNumber;
        case "÷":
            return firstNumber / secondNumber;
        default:
            return 0;
    }
};

export default Home;
