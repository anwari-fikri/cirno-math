import React, { useState } from "react";
import ToggleOperation from "./ToggleOperation";

const ConfigMenu = () => {
    return (
        <div>
            <div className="bg-gray-900 px-2 rounded-sm">
                <ToggleOperation operation="+" />
                <ToggleOperation operation="-" />
            </div>
        </div>
    );
};

export default ConfigMenu;
