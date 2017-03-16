import React from "react";
import IframeComm from "react-iframe-comm";

const Demo = ({}) => {
    // the html attributes to create the iframe with
    // make sure you use camelCase attribute names
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        width: "100%",
        height: "175"
    };

    // the postMessage data you want to send to your iframe
    // it will be send after the iframe has loaded
    const postMessageData = "hello iframe";

    // parent received a message from iframe
    const onReceiveMessage = () => {
        console.log("handleReceiveMessage");
    };

    // iframe has loaded
    const onReady = () => {
        console.log("onReady");
    };

    return (
        <IframeComm
            attributes={attributes}
            postMessageData={postMessageData}
            handleReady={onReady}
            handleReceiveMessage={onReceiveMessage}
        />
    );
};

export default Demo;
