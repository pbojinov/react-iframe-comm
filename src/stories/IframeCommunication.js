import React, { Component, PropTypes } from "react";

class IframeCommunication extends Component {
    constructor() {
        super();
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleReady = this.handleReady.bind(this);
    }
    componentDidMount() {
        window.addEventListener("message", this.receiveMessage);
        this._frame.addEventListener("load", this.handleReady);
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.receiveMessage, false);
    }
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps");
    }
    receiveMessage(event) {
        // console.log("receiveMessage");
        console.log(event.data);
        const { onReceiveMessage } = this.props;
        if (onReceiveMessage) {
            onReceiveMessage(event);
        }
    }
    serializePostMessageData(data) {
        // serialize data since postMessage accepts a string only message
        if (typeof data === "object") {
            data.data = Math.random();
            return JSON.stringify(data);
        } else if (typeof data === "string") {
            return data;
        } else {
            return `${data}`;
        }
    }
    handleReady() {
        console.log("handleReady");
        const { onReady, postMessageData } = this.props;
        if (onReady) {
            onReady();
            if (postMessageData) {
                const data = this.serializePostMessageData(postMessageData);
                this._frame.contentWindow.postMessage(data, "*");
            }
        }
    }
    render() {
        const { attributes } = this.props;

        // define some sensible defaults for our iframe attributes
        const defaultAttributes = {
            frameBorder: 0
        };

        // then merge in the user's attributes with our defaults
        const mergedAttributes = Object.assign(
            {},
            defaultAttributes,
            attributes
        );
        console.log(this.props);
        return (
            <iframe
                id="_iframe"
                ref={el => {
                    this._frame = el;
                }}
                {...mergedAttributes}
            />
        );
    }
}

IframeCommunication.propTypes = {
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
        sandbox: PropTypes.string,
        srcDoc: PropTypes.string,
        src: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onReceiveMessage: PropTypes.func,
    onReady: PropTypes.func,
    /*
        You can pass it anything you want, we'll serialize to a string
        preferablly use a simple string message or an object.
        If you use an object, you need to follow the same naming convention
        in the iframe so you can parse it accordingly.
     */
    postMessageData: PropTypes.any,
    topic: PropTypes.string
    // ? targetOrigin: PropTypes.string,
};

export default IframeCommunication;

/*
const { data: { topic } } = event;
switch (topic) {
    case 'setScroll':
        // do someething
        break;
    default:
        break;
}
 */

// ----
// TODO: handle multiple iframes on one page with the listen code
// we only want to listen to this components messages, not others
// ----
// TODO: handle XDomain check for security purposes
// ----
