import { makeObservable, observable, runInAction } from "mobx";

class ConfigStore {
    isAdd: boolean = true;
    isSubtract: boolean = false;

    constructor() {
        makeObservable(this, {
            isAdd: observable,
            isSubtract: observable,
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
}

export default new ConfigStore();
