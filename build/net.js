'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NetResponse = function NetResponse(request) {
    var debug = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, NetResponse);

    this.text = request.responseText;

    this.status = {
        text: request.statusText,
        code: request.status
    };

    this.url = request.responseURL;
    this.json = null;
    this.debug = debug;

    try {
        this.json = JSON.parse(request.responseText);
    } catch (e) {
        if (this.debug) {
            console.warn('Failed to parse JSON', e);
        }
    }

    this.xreq = request;
};

var NetRequest =
// Define the defaults for all requests
function NetRequest(method, address, data, headers) {
    var _this = this;

    _classCallCheck(this, NetRequest);

    // Make a new request with the data provided
    this.request = new XMLHttpRequest();
    this.response = null;

    // Check method valid
    if (__NET_ALLOWED_METHODS.indexOf(method) < 0) {
        console.warn('Sorry, \'' + method + '\' is not a supported HTTP method');
        return false;
    }

    // Check valid URL
    if (!(typeof address === 'string') && address.length > 0) {
        console.warn('Sorry, \'' + address + '\' is not a supported HTTP address');
        return false;
    }

    // Return a Promise to the Caller
    return new Promise(function (resolve, reject) {

        if ("withCredentials" in _this.request) {
            // XMLHttpRequest for Chrome/Firefox/Opera/Safari.
            _this.request.open(method, address, true); // NOTE: Do we want to provide synchronous support?
        } else if (typeof XDomainRequest != "undefined") {
                // XDomainRequest for IE.
                _this.request = new XDomainRequest();
                _this.request.open(method, address);
            } else {
                // CORS not supported.
                _this.request = null;
            };

        if (!_this.request) {
            return;
        };

        // For all the headers, add them to the request
        if (typeof headers === 'object') {
            for (var header in headers) {
                _this.request.setRequestHeader(header, headers[header]);
            }
        }

        // Define when to call resolve and when to call reject
        _this.request.onload = function () {
            _this.response = new NetResponse(_this.request);
            resolve(_this.response);
        };

        _this.request.onerror = function () {
            _this.response = new NetResponse(_this.request);
            reject(_this.response);
        };

        //these blank handlers need to be set to fix ie9
        _this.request.onprogress = function () {};
        _this.request.ontimeout = function () {};

        // Send the request!
        try {
            if (typeof data === 'object') {
                _this.request.send(JSON.stringify(data));
            } else {
                _this.request.send();
            }
        } catch (e) {
            console.warn('Failed to send request', e);
        }
    });
};

var Net = (function () {
    function Net(root, headers) {
        _classCallCheck(this, Net);

        // Define the default headers for NetRequests
        this.headers = headers || {
            'Content-Type': 'application/json'
        };

        this.root = root || null;
    }

    _createClass(Net, [{
        key: 'setHeaders',
        value: function setHeaders(headers) {
            this.headers = _extends({}, this.headers, headers);
            return true;
        }
    }, {
        key: 'request',
        value: function request(path, method, data, headers) {
            // Override certain headers
            try {
                return new NetRequest(method, typeof this.root === 'string' ? '' + this.root + path : path, data || null, typeof headers === 'object' ? _extends({}, this.headers, headers) : this.headers);
            } catch (e) {
                console.warn(e);
            }

            return false;
        }
    }, {
        key: 'get',
        value: function get(path, data, headers) {
            return this.request(path, 'GET', data, headers);
        }
    }, {
        key: 'post',
        value: function post(path, data, headers) {
            return this.request(path, 'POST', data, headers);
        }
    }, {
        key: 'put',
        value: function put(path, data, headers) {
            return this.request(path, 'PUT', data, headers);
        }
    }, {
        key: 'patch',
        value: function patch(path, data, headers) {
            return this.request(path, 'PATCH', data, headers);
        }
    }, {
        key: 'delete',
        value: function _delete(path, data, headers) {
            return this.request(path, 'DELETE', data, headers);
        }
    }]);

    return Net;
})();

var __NET_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
var __NET_AUTHORS = ['David Hariri'];
