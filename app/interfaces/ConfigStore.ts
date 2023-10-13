import { makeObservable, observable, runInAction } from "mobx";

class ConfigStore {
    isAdd: boolean = true;
    isSubtract: boolean = false;
    isMultiplication: boolean = false;
    isDivision: boolean = false;

    constructor() {
        makeObservable(this, {
            isAdd: observable,
            isSubtract: observable,
            isMultiplication: observable,
            isDivision: observable,
        });
    }

    handleToggleAdd = async () => {
        runInAction(() => {
            this.isAdd = !this.isAdd;
        });
    };

    handleToggleSubtract = async () => {
        runInAction(() => {
            this.isSubtract = !this.isSubtract;
        });
    };

    handleToggleMultiplication = async () => {
        runInAction(() => {
            this.isMultiplication = !this.isMultiplication;
        });
    };

    handleToggleDivision = async () => {
        runInAction(() => {
            this.isDivision = !this.isDivision;
        });
    };
}

export default new ConfigStore();
