import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import { WithNotes } from "@kadira/storybook-addon-notes";
import {
    withKnobs,
    text,
    boolean,
    number
} from "@kadira/storybook-addon-knobs";
import Welcome from "./Welcome";
import IframeCommunication from "./IframeCommunication";

const stories = storiesOf("Welcome", module);
stories.addDecorator(withKnobs);

// stories.add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

// Knobs for React props
stories.add("with a button", () => (
    <button disabled={boolean("Disabled", false)}>
        {text("Label", "Hello Button")}
    </button>
));

// Knobs as dynamic variables.
stories.add("as dynamic variables", () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);

    const content = `I am ${name} and I'm ${age} years old.`;
    return <div>{content}</div>;
});

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));

stories.add("iframe comm example", () => {
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        // src: "http://127.0.0.1:8080/examples/iframe.html",
        width: "100%",
        height: "175"
    };
    // const handleOnReady = () => {
    //     console.log("handleOnReady");
    // };
    // let postMessageData = number(Math.random(), 12345);
    const sendIframeMessage = () => {
        console.log("sending message to iframe...");
        // postMessageData = {
        //     topic: "hi again",
        //     data: Math.random()
        // };
    };
    return (
        <span>
            <IframeCommunication
                attributes={attributes}
                postMessageData={number(12345, 98765)}
                onReceiveMessage={action("onReceiveMessage")}
                onReady={action("handleOnReady")}
            />
            <button onClick={sendIframeMessage}>
                Send message to iframe
            </button>
        </span>
    );
});
