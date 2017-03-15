import React, { Component, PropTypes } from "react";

class IframeCommunication extends Component {
    constructor() {
        super();
        this.receiveMessage = receiveMessage.bind(this);
    }
    componentDidMount() {
        console.log("componentDidMount");
        window.addEventListener("message", this.receiveMessage);
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
    }
    receiveMessage(event) {
        console.log("receiveMessage");
        console.log(event);
        const { onReceiveMessage } = this.props;
        if (onReceiveMessage) {
            onReceiveMessage(event);
        }
    }
    handleReady() {
        console.log("handleReady");
        const { onReady } = this.props;
        if (onReady) {
            onReady();
        }
    }
    render() {
        const { attributes: { src } } = this.props;
        return <iframe src={src} onLoad={this.handleReady} />;
    }
}

IframeCommunication.propTypes = {
    attributes: PropTypes.shape({
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
        allowfullscreen: PropTypes.string,
        frameborder: PropTypes.string,
        height: PropTypes.string,
        name: PropTypes.string,
        referrerpolicy: PropTypes.string,
        scrolling: PropTypes.string,
        sandbox: PropTypes.string,
        src: PropTypes.string.isRequired,
        width: PropTypes.string
    }),
    onReceiveMessage: PropTypes.func,
    onReady: PropTypes.func,
    postMessageData: PropTypes.object
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
