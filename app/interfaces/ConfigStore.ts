import { makeObservable, observable, runInAction, action } from "mobx";

class ConfigStore {
    isAdd: boolean = true;
    isSubtract: boolean = false;
    isMultiplication: boolean = false;
    isDivision: boolean = false;

    availableOperations: ("+" | "-" | "x" | "÷")[] = [];
    selectedOperation: "+" | "-" | "x" | "÷" = "+";

    constructor() {
        makeObservable(this, {
            isAdd: observable,
            isSubtract: observable,
            isMultiplication: observable,
            isDivision: observable,
            availableOperations: observable,
            selectedOperation: observable,
            handleChooseOperation: action,
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
        console.log("config_operation", this.selectedOperation);
    };

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
