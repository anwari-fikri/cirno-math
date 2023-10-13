import React from "react";
import ToggleOperation from "./ToggleOperation";
import ConfigStore from "../interfaces/ConfigStore";
import { observer } from "mobx-react";

const ConfigMenu = observer(() => {
    return (
        <div>
            <div className="bg-gray-900 px-2 rounded-sm">
                <ToggleOperation
                    operation="+ Addition"
                    state={ConfigStore.isAdd}
                    action={ConfigStore.handleToggleAdd}
                />
                <ToggleOperation
                    operation="- Subtraction"
                    state={ConfigStore.isSubtract}
                    action={ConfigStore.handleToggleSubtract}
                />
                <ToggleOperation
                    operation="× Multiplication"
                    state={ConfigStore.isMultiplication}
                    action={ConfigStore.handleToggleMultiplication}
                />
                <ToggleOperation
                    operation="÷ Division"
                    state={ConfigStore.isDivision}
                    action={ConfigStore.handleToggleDivision}
                />
            </div>
        </div>
    );
});

export default ConfigMenu;
