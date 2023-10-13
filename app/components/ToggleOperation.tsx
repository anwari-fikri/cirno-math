import React, { useState } from "react";
import { observer } from "mobx-react";
import ConfigStore from "../interfaces/ConfigStore";

const ToggleOperation = observer(
    ({
        operation,
        state,
        action,
    }: {
        operation: string;
        state: boolean;
        action: any;
    }) => {
        const [enabled, setEnabled] = useState(state);

        return (
            <button
                className={`font-bold p-2 hover:text-white ${
                    enabled ? "text-blue-300" : "text-gray-600"
                }`}
                onClick={() => {
                    setEnabled(!enabled);
                    action();
                    console.log(operation, enabled);
                    console.log(
                        "store",
                        ConfigStore.isAdd,
                        ConfigStore.isSubtract
                    );
                }}
            >
                <p>{operation}</p>
            </button>
        );
    }
);

export default ToggleOperation;
