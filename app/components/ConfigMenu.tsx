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
            </div>
        </div>
    );
});

export default ConfigMenu;
