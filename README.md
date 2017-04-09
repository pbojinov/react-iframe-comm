React iFrame communication
============

> A React component for communicating between a parent window and an iframe.

## Demo

Live Demo: [https://pbojinov.github.io/react-iframe-comm/](https://pbojinov.github.io/react-iframe-comm/)

Or locally run:

```
npm install
npm run storybook
```

Then open [http://localhost:9009/](http://localhost:9009/) in your browser.


## Installation

The easiest way to use React Iframe Communication is to install it from NPM.

```
npm install react-iframe-comm --save
```

At this point you can import `react-iframe-comm` in your application as follows:

```javascript
import IframeComm from 'react-iframe-comm';
```

## Usage
 

```javascript
import React from "react";
import IframeComm from "react-iframe-comm";

const Demo = ({}) => {

    // the html attributes to create the iframe with
    // make sure you use camelCase attribute names
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        width: "100%",
        height: "175",
        frameBorder: 1, // show frame border just for fun...
    };

    // the postMessage data you want to send to your iframe
    // it will be send after the iframe has loaded
    const postMessageData = "hello iframe";

    // parent received a message from iframe
    const onReceiveMessage = () => {
        console.log("onReceiveMessage");
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

```

## Configuration Options


```javascript
IframeComm.propTypes = {
    /*
        Iframe Attributes
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
        React Supported Attributes
        https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
        Note: attributes are camelCase, not all lowercase as usually defined.
    */
    attributes: PropTypes.shape({
        allowFullScreen: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        frameBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        scrolling: PropTypes.string,
        // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        sandbox: PropTypes.string,
        srcDoc: PropTypes.string,
        src: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    
    // Callback function called when iFrame sends the parent window a message.
    handleReceiveMessage: PropTypes.func,

    /*    
        Callback function called when iframe loads. 
        We're simply listening to the iframe's `window.onload`.
        To ensure communication code in your iframe is totally loaded,
        you can implement a syn-ack TCP-like handshake using `postMessageData` and `handleReceiveMessage`.
    */
    handleReady: PropTypes.func,
    
    /*
        You can pass it anything you want, we'll serialize to a string
        preferablly use a simple string message or an object.
        If you use an object, you need to follow the same naming convention
        in the iframe so you can parse it accordingly.
     */
    postMessageData: PropTypes.any.isRequired,
    
    /*
        Enable use of the browser's built-in structured clone algorithm for serialization
        by settings this to `false`. 
        Default is `true`, using our built in logic for serializing everything to a string.
    */
    serializeMessage: PropTypes.bool,

    /*
        Always provide a specific targetOrigin, not *, if you know where the other window's document should be located. Failing to provide a specific target discloses the data you send to any interested malicious site.
     */
    targetOrigin: PropTypes.string
};
```

## License

The MIT License (MIT) - 2017
