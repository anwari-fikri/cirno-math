import { makeObservable, observable, runInAction, action } from "mobx";

class ConfigStore {
    availableOperations: ("+" | "-" | "x" | "÷")[] = ["+"];
    selectedOperation: "+" | "-" | "x" | "÷" = "+";
    isAdd: boolean = true;
    isSubtract: boolean = false;
    isMultiplication: boolean = false;
    isDivision: boolean = false;

    playTimer: 30 | 60 | 120 = 30; // seconds
    playDifficulty: "easy" | "normal" | "hard" = "easy";
    difficultyConfig = {
        // for generateNewNumber(min, max)
        "+": {
            easy: { first: [1, 9], second: [1, 9] },
            normal: { first: [10, 99], second: [10, 99] },
            hard: { first: [100, 999], second: [100, 999] },
        },
        "-": {
            easy: { first: [1, 9], second: [1, 9] },
            normal: { first: [10, 99], second: [10, 99] },
            hard: { first: [100, 999], second: [100, 999] },
        },
        "x": {
            easy: { first: [1, 9], second: [1, 9] },
            normal: { first: [10, 99], second: [1, 9] },
            hard: { first: [10, 99], second: [10, 99] },
        },
        "÷": {
            easy: { first: [1, 9], second: [1, 9] },
            normal: { first: [5, 20], second: [3, 9] },
            hard: { first: [5, 50], second: [5, 20] },
        },
    };

    constructor() {
        makeObservable(this, {
            isAdd: observable,
            isSubtract: observable,
            isMultiplication: observable,
            isDivision: observable,
            availableOperations: observable,
            selectedOperation: observable,
            handleChooseOperation: action,

            playTimer: observable,
            handleSetPlayTimer: action,

            playDifficulty: observable,
            difficultyConfig: observable,
        });
    }

    handleSetPlayDifficulty(input: "easy" | "normal" | "hard") {
        this.playDifficulty = input;
    }

    handleChooseOperation = () => {
        if (this.availableOperations.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * this.availableOperations.length
            );
            const randomOperation = this.availableOperations[randomIndex] as
                | "+"
                | "-"
                | "x"
                | "÷";
            this.selectedOperation = randomOperation;
        }
    };

    handleChangeOperation = async () => {
        this.availableOperations = [];

        if (this.isAdd) this.availableOperations.push("+");
        if (this.isSubtract) this.availableOperations.push("-");
        if (this.isMultiplication) this.availableOperations.push("x");
        if (this.isDivision) this.availableOperations.push("÷");

        this.handleChooseOperation();
    };

    handleSetPlayTimer(input: 30 | 60 | 120) {
        this.playTimer = input;
    }

    handleToggleAdd = async () => {
        runInAction(() => {
            this.isAdd = !this.isAdd;
            this.handleChangeOperation();
        });
    };

    handleToggleSubtract = async () => {
        runInAction(() => {
            this.isSubtract = !this.isSubtract;
            this.handleChangeOperation();
        });
    };

    handleToggleMultiplication = async () => {
        runInAction(() => {
            this.isMultiplication = !this.isMultiplication;
            this.handleChangeOperation();
        });
    };

    handleToggleDivision = async () => {
        runInAction(() => {
            this.isDivision = !this.isDivision;
            this.handleChangeOperation();
        });
    };
}

export default new ConfigStore();
