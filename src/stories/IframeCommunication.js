import React, { Component, PropTypes } from "react";

class IframeCommunication extends Component {
    constructor() {
        super();
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleReady = this.handleReady.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
        // console.log("this", this.props.postMessageData);
        // console.log("next", nextProps.postMessageData);
        if (this.props.postMessageData !== nextProps.postMessageData) {
            // send a message if postMessageData changed
            this.sendMessage(nextProps.postMessageData);
        }
    }
    receiveMessage(event) {
        // console.log("receiveMessage");
        // console.log(event.data);
        const { onReceiveMessage } = this.props;
        if (onReceiveMessage) {
            onReceiveMessage(event);
        }
    }
    handleReady() {
        // console.log("handleReady");
        const { onReady } = this.props;
        if (onReady) {
            onReady();
            this.sendMessage();
        }
    }
    serializePostMessageData(data) {
        // serialize data since postMessage accepts a string only message
        if (typeof data === "object") {
            return JSON.stringify(data);
        } else if (typeof data === "string") {
            return data;
        } else {
            return `${data}`;
        }
    }
    sendMessage() {
        const { postMessageData, targetOrigin } = this.props;
        const serializedData = this.serializePostMessageData(postMessageData);
        this._frame.contentWindow.postMessage(serializedData, targetOrigin);
    }
    render() {
        const { attributes } = this.props;
        // define some sensible defaults for our iframe attributes
        const defaultAttributes = {
            allowFullScreen: false,
            frameBorder: 0
        };
        // then merge in the user's attributes with our defaults
        const mergedAttributes = Object.assign(
            {},
            defaultAttributes,
            attributes
        );
        return (
            <span>

                <iframe
                    id="_iframe"
                    ref={el => {
                        this._frame = el;
                    }}
                    {...mergedAttributes}
                />
                {this.props.postMessageData}
            </span>
        );
    }
}

IframeCommunication.defaultProps = {
    targetOrigin: "*"
};

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
        // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
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
    topic: PropTypes.string,
    /*
        Always provide a specific targetOrigin, not *, if you know where the other window's document should be located. Failing to provide a specific target discloses the data you send to any interested malicious site.
     */
    targetOrigin: PropTypes.string
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
