import { makeObservable, observable } from "mobx";

class ConfigStore {
    isAdd: boolean = false;
    isSubtract: boolean = false;

    constructor() {
        makeObservable(this, {
            isAdd: observable,
            isSubtract: observable,
        });
    }
}

export default new ConfigStore();
