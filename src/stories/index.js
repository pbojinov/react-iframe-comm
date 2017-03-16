import React from "react";
import IframeCommunication from "./IframeCommunication";
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
        // src: "http://127.0.0.1:8080/examples/iframe.html",
        width: "100%",
        height: "175"
    };
    return (
        <span>
            <IframeCommunication
                attributes={object("attributes", attributes)}
                postMessageData={number("postMessageData", 12345)}
                onReceiveMessage={action("onReceiveMessage")}
                onReady={action("handleOnReady")}
            />
        </span>
    );
});
