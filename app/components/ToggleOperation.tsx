import React, { useState } from "react";
import { observer } from "mobx-react";

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
                }}
            >
                <p>{operation}</p>
            </button>
        );
    }
);

export default ToggleOperation;
