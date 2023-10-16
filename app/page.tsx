"use client";

import React, { useState, useEffect } from "react";
import ConfigMenu from "./components/ConfigMenu";
import ConfigStore from "./interfaces/ConfigStore";
import { observer } from "mobx-react";

const Home = observer(() => {
    const [isStart, setIsStart] = useState<boolean>(false);
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [operation, setOperation] = useState<"+" | "-" | "x" | "÷">("+");
    const [answer, setAnswer] = useState<number>(0);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = Number(e.target.value);
        setAnswer(userAnswer);

        if (!isStart && userAnswer === 0) {
            setIsStart(true);
            ConfigStore.handleChooseOperation();
            setOperation(ConfigStore.selectedOperation);
        }

        let correctAnswer: number;
        switch (operation) {
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

        const generateNewNumber = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        if (userAnswer === correctAnswer) {
            ConfigStore.handleChooseOperation();
            const newOperation = ConfigStore.selectedOperation; // Update the operation first
            setOperation(newOperation);
            var newFirstNumber, newSecondNumber;
            switch (newOperation) {
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
            <ConfigMenu />
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
        </div>
    );
});

export default Home;
