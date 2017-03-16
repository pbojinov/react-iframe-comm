import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Welcome from "./Welcome";
import IframeCommunication from "./IframeCommunication";

storiesOf("Welcome", module).add("to Storybook", () => (
    <Welcome showApp={linkTo("Button")} />
));

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));

storiesOf("IframeCommunication", module).add("with just src", () => {
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        // src: "http://127.0.0.1:8080/examples/iframe.html",
        width: "100%",
        height: "175"
    };
    const handleOnReady = () => {
        console.log("handleOnReady");
    };
    let postMessageData = {
        topic: "hello",
        data: Math.random()
    };
    const sendIframeMessage = () => {
        console.log("sending message to iframe...");
        postMessageData = {
            topic: "hi again",
            data: Math.random()
        };
    };
    return (
        <div>
            <IframeCommunication
                attributes={attributes}
                postMessageData={postMessageData}
                onReady={handleOnReady}
            />
            <button onClick={sendIframeMessage}>Send message to iframe</button>
        </div>
    );
});
