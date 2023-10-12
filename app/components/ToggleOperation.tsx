import React, { useState } from "react";

const ToggleOperation = ({ operation }: { operation: string }) => {
    const [enabled, setEnabled] = useState(true);

    return (
        <button
            className={`font-bold p-2 hover:text-white ${
                enabled ? "text-blue-300" : "text-gray-600"
            }`}
            onClick={() => setEnabled(!enabled)}
        >
            <p>{operation}</p>
        </button>
    );
};

export default ToggleOperation;
