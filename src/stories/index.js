import React from "react";
import IframeComm from "../IframeComm";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import { WithNotes } from "@kadira/storybook-addon-notes";
import {
    withKnobs,
    text,
    boolean,
    number,
    object
} from "@kadira/storybook-addon-knobs";

const stories = storiesOf("Iframe Communication", module);
stories.addDecorator(withKnobs);

stories.add("simple example", () => {
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        // src: "http://127.0.0.1:8080/public/iframe.html",
        width: "100%",
        height: "200"
    };
    // the postMessage data you want to send to your iframe
    // it will be send after the iframe has loaded
    const postMessageData = {
        message: "hello"
    };

    return (
        <WithNotes
            notes={
                `Look at the ACTION LOGGER tab to see events from the iframe. Such as handleReceiveMessage and handleReady.`
            }
        >
            <IframeComm
                attributes={object("attributes", attributes)}
                postMessageData={object("postMessageData", postMessageData)}
                handleReceiveMessage={action("handleReceiveMessage")}
                handleReady={action("handleOnReady")}
            />
        </WithNotes>
    );
});
