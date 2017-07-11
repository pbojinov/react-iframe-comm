"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IframeComm = function (_Component) {
    _inherits(IframeComm, _Component);

    function IframeComm() {
        _classCallCheck(this, IframeComm);

        var _this = _possibleConstructorReturn(this, (IframeComm.__proto__ || Object.getPrototypeOf(IframeComm)).call(this));

        _this.onReceiveMessage = _this.onReceiveMessage.bind(_this);
        _this.onLoad = _this.onLoad.bind(_this);
        _this.sendMessage = _this.sendMessage.bind(_this);
        return _this;
    }

    _createClass(IframeComm, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            window.addEventListener("message", this.onReceiveMessage);
            this._frame.addEventListener("load", this.onLoad);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("message", this.onReceiveMessage, false);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.postMessageData !== nextProps.postMessageData) {
                // send a message if postMessageData changed
                this.sendMessage(nextProps.postMessageData);
            }
        }
    }, {
        key: "onReceiveMessage",
        value: function onReceiveMessage(event) {
            var handleReceiveMessage = this.props.handleReceiveMessage;

            if (handleReceiveMessage) {
                handleReceiveMessage(event);
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            var handleReady = this.props.handleReady;

            if (handleReady) {
                handleReady();
            }
            // TODO: Look into doing a syn-ack TCP-like handshake
            //       to make sure iFrame is ready to REALLY accept messages, not just loaded.
            // send intial props when iframe loads
            this.sendMessage(this.props.postMessageData);
        }
    }, {
        key: "serializePostMessageData",
        value: function serializePostMessageData(data) {
            // Rely on the browser's built-in structured clone algorithm for serialization of the
            // message as described in
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
            if (!this.props.serializeMessage) {
                return data;
            }

            // To be on the safe side we can also ignore the browser's built-in serialization feature
            // and serialize the data manually.
            if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
                return JSON.stringify(data);
            } else if (typeof data === "string") {
                return data;
            } else {
                return "" + data;
            }
        }
    }, {
        key: "sendMessage",
        value: function sendMessage(postMessageData) {
            // Using postMessage data from props will result in a subtle but deadly bug,
            // where old data from props is being sent instead of new postMessageData.
            // This is because data sent from componentWillReceiveProps is not yet in props but only in nextProps.
            var targetOrigin = this.props.targetOrigin;

            var serializedData = this.serializePostMessageData(postMessageData);
            this._frame.contentWindow.postMessage(serializedData, targetOrigin);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var attributes = this.props.attributes;
            // define some sensible defaults for our iframe attributes

            var defaultAttributes = {
                allowFullScreen: false,
                frameBorder: 0
            };
            // then merge in the user's attributes with our defaults
            var mergedAttributes = Object.assign({}, defaultAttributes, attributes);
            return _react2.default.createElement("iframe", _extends({
                ref: function ref(el) {
                    _this2._frame = el;
                }
            }, mergedAttributes));
        }
    }]);

    return IframeComm;
}(_react.Component);

IframeComm.defaultProps = {
    serializeMessage: true,
    targetOrigin: "*",
    postMessageData: ""
};

IframeComm.propTypes = {
    /*
        Iframe Attributes
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
        React Supported Attributes
        https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
        Note: attributes are camelCase, not all lowercase as usually defined.
    */
    attributes: _propTypes2.default.shape({
        allowFullScreen: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
        frameBorder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
        height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
        name: _propTypes2.default.string,
        scrolling: _propTypes2.default.string,
        // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        sandbox: _propTypes2.default.string,
        srcDoc: _propTypes2.default.string,
        src: _propTypes2.default.string.isRequired,
        width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    }),

    // Callback function called when iFrame sends the parent window a message.
    handleReceiveMessage: _propTypes2.default.func,

    /*    
        Callback function called when iframe loads. 
        We're simply listening to the iframe's `window.onload`.
        To ensure communication code in your iframe is totally loaded,
        you can implement a syn-ack TCP-like handshake using `postMessageData` and `handleReceiveMessage`.
    */
    handleReady: _propTypes2.default.func,

    /*
        You can pass it anything you want, we'll serialize to a string
        preferablly use a simple string message or an object.
        If you use an object, you need to follow the same naming convention
        in the iframe so you can parse it accordingly.
     */
    postMessageData: _propTypes2.default.any.isRequired,

    /*
        Enable use of the browser's built-in structured clone algorithm for serialization
        by settings this to `false`. 
        Default is `true`, using our built in logic for serializing everything to a string.
    */
    serializeMessage: _propTypes2.default.bool,

    /*
        Always provide a specific targetOrigin, not *, if you know where the other window's document should be located. Failing to provide a specific target discloses the data you send to any interested malicious site.
     */
    targetOrigin: _propTypes2.default.string
};

exports.default = IframeComm;
