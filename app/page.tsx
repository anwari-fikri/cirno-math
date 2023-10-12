"use client";

import React, { useState } from "react";
import ConfigMenu from "./components/ConfigMenu";

export default function Home() {
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [operation, setOperation] = useState<"+" | "-" | "x" | "/">("+");
    const [answer, setAnswer] = useState<string>("");

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = Number(e.target.value);
        setAnswer(userAnswer.toString()); // Update the answer state with the user's input.

        if (userAnswer === firstNumber + secondNumber) {
            // If the user's answer is correct, generate new numbers.
            const newFirstNumber = Math.floor(Math.random() * 90) + 10; // Generates a random number between 10 and 99.
            const newSecondNumber = Math.floor(Math.random() * 90) + 10;

            setFirstNumber(newFirstNumber);
            setSecondNumber(newSecondNumber);
            setAnswer("");
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-5">
            <ConfigMenu />
            <p className="text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                {firstNumber} {operation} {secondNumber}
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
