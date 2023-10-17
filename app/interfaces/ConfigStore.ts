import { makeObservable, observable, runInAction, action } from "mobx";

class ConfigStore {
    availableOperations: ("+" | "-" | "x" | "÷")[] = ["+"];
    selectedOperation: "+" | "-" | "x" | "÷" = "+";
    isAdd: boolean = true;
    isSubtract: boolean = false;
    isMultiplication: boolean = false;
    isDivision: boolean = false;

    playTimer: 30 | 60 | 120 = 30; // seconds

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
        });
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
