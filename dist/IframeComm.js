"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
                this.sendMessage();
            }
        }
    }, {
        key: "serializePostMessageData",
        value: function serializePostMessageData(data) {
            // serialize data since postMessage accepts a string only message
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
        value: function sendMessage() {
            var _props = this.props,
                postMessageData = _props.postMessageData,
                targetOrigin = _props.targetOrigin;

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
                id: "_iframe",
                ref: function ref(el) {
                    _this2._frame = el;
                }
            }, mergedAttributes));
        }
    }]);

    return IframeComm;
}(_react.Component);

IframeComm.defaultProps = {
    targetOrigin: "*"
};

IframeComm.propTypes = {
    /*
        Iframe Attributes
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
         React Supported Attributes
        https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
         Note: attributes are camelCase, not all lowercase as usually defined.
    */
    attributes: _react.PropTypes.shape({
        allowFullScreen: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
        frameBorder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
        height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
        name: _react.PropTypes.string,
        scrolling: _react.PropTypes.string,
        // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        sandbox: _react.PropTypes.string,
        srcDoc: _react.PropTypes.string,
        src: _react.PropTypes.string.isRequired,
        width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
    }),
    handleReceiveMessage: _react.PropTypes.func,
    handleReady: _react.PropTypes.func,
    /*
        You can pass it anything you want, we'll serialize to a string
        preferablly use a simple string message or an object.
        If you use an object, you need to follow the same naming convention
        in the iframe so you can parse it accordingly.
     */
    postMessageData: _react.PropTypes.any,
    topic: _react.PropTypes.string,
    /*
        Always provide a specific targetOrigin, not *, if you know where the other window's document should be located. Failing to provide a specific target discloses the data you send to any interested malicious site.
     */
    targetOrigin: _react.PropTypes.string
};

exports.default = IframeComm;

// ----
// TODO: handle multiple iframes on one page with the listen code
// we only want to listen to this components messages, not others
// ----
// TODO: handle XDomain check for security purposes
// ----
