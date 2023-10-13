"use client";

import React, { useState } from "react";
import ConfigMenu from "./components/ConfigMenu";
import ConfigStore from "./interfaces/ConfigStore";

export default function Home() {
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [operation, setOperation] = useState<"+" | "-" | "×" | "÷">("+");
    const [answer, setAnswer] = useState<string>("");

    const generateNewNumber = () => {
        return Math.floor(Math.random() * 90) + 10;
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = Number(e.target.value);
        setAnswer(e.target.value);

        let correctAnswer: number | undefined;

        switch (operation) {
            case "+":
                correctAnswer = firstNumber + secondNumber;
                break;
            case "-":
                correctAnswer = firstNumber - secondNumber;
                break;
            case "×":
                correctAnswer = firstNumber * secondNumber;
                break;
            case "÷":
                correctAnswer = firstNumber / secondNumber;
                break;
        }

        if (userAnswer === correctAnswer) {
            handleChangeOperation();

            var newFirstNumber, newSecondNumber;
            if (operation == "+") {
                newFirstNumber = generateNewNumber();
                newSecondNumber = generateNewNumber();
            } else {
                newFirstNumber = generateNewNumber();
                newSecondNumber = Math.floor(Math.random() * newFirstNumber);
            }

            setFirstNumber(newFirstNumber);
            setSecondNumber(newSecondNumber);
            setAnswer("");
        }
    };

    const handleChangeOperation = () => {
        const availableOperations = [];

        if (ConfigStore.isAdd) availableOperations.push("+");
        if (ConfigStore.isSubtract) availableOperations.push("-");
        if (ConfigStore.isMultiplication) availableOperations.push("x");
        if (ConfigStore.isDivision) availableOperations.push("/");

        if (availableOperations.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * availableOperations.length
            );
            const randomOperation = availableOperations[randomIndex] as
                | "+"
                | "-"
                | "×"
                | "÷";
            setOperation(randomOperation);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-5">
            <ConfigMenu />
            <p className="text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                {firstNumber === 0 && secondNumber === 0
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
}
