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
        // src: "http://127.0.0.1:8080/iframe.html",
        width: "100%",
        height: "175"
    };
    const handleOnReady = () => {
        console.log("handleOnReady");
    };
    const postMessageData = {
        topic: "hello",
        data: "..."
    };
    const sendIframeMessage = () => {
        console.log("sending...");
        // const data = this.serializePostMessageData(this.props.postMessageData);
        // this._frame.contentWindow.postMessage(data, "*");
    };
    return (
        <div>
            <button onClick={sendIframeMessage}>Send Message</button>
            <IframeCommunication
                attributes={attributes}
                postMessageData={postMessageData}
                onReady={handleOnReady}
            />
        </div>
    );
});
