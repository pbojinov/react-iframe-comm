import React from "react";
import ReactDOM from "react-dom";
import IframeComm from "./IframeComm";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IframeComm />, div);
});
