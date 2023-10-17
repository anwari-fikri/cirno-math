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
    const [answer, setAnswer] = useState<number>(0);
    const [score, setScore] = useState<number>(-1);

    const { secondsLeft, countdownEnd, startCountdown } = useCountdown();

    const handleRestartButton = () => {
        setIsStart(false);
        setScore(-1);
        setAnswer(0);
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = Number(e.target.value);
        setAnswer(userAnswer);

        // Start counting down
        if (!isStart && userAnswer === 0) {
            setIsStart(true);
            ConfigStore.handleChooseOperation();
            startCountdown(2);
        }

        // Check correct answer every keystroke
        let correctAnswer: number;
        switch (ConfigStore.selectedOperation) {
            case "+":
                correctAnswer = firstNumber + secondNumber;
                break;
            case "-":
                correctAnswer = firstNumber - secondNumber;
                break;
            case "x":
                correctAnswer = firstNumber * secondNumber;
                break;
            case "÷":
                correctAnswer = firstNumber / secondNumber;
                break;
        }

        // If correct answer => Generate new question
        if (userAnswer === correctAnswer) {
            ConfigStore.handleChooseOperation();
            setScore((prevScore) => prevScore + 1);

            var newFirstNumber, newSecondNumber;
            switch (ConfigStore.selectedOperation) {
                case "+":
                    newFirstNumber = generateNewNumber(10, 99);
                    newSecondNumber = generateNewNumber(10, 99);
                    break;
                case "-":
                    newFirstNumber = generateNewNumber(10, 99);
                    newSecondNumber = generateNewNumber(10, newFirstNumber);
                    break;
                case "x":
                    newFirstNumber = generateNewNumber(10, 99);
                    newSecondNumber = generateNewNumber(1, 9);
                    break;
                case "÷":
                    newSecondNumber = generateNewNumber(1, 9);
                    newFirstNumber = newSecondNumber * generateNewNumber(1, 99);
                    break;
                default:
                    newFirstNumber = 0;
                    newSecondNumber = 0;
                    break;
            }

            setFirstNumber(newFirstNumber);
            setSecondNumber(newSecondNumber);
            setAnswer(0);
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
                            : `${firstNumber} ${ConfigStore.selectedOperation} ${secondNumber}`}
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

const generateNewNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default Home;
