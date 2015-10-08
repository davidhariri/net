// © David Hariri, 2015
// Developed while working on Volley

// TODO: Publish to NPM
// TODO: Better error handling
// {{Node Requirements}}

// Define some default settings to use which can be overridden in setup
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var settings = {
    headers: {
        'Content-Type': 'application/json'
    },
    type: 'application/x-www-form-urlencoded; charset=UTF-8'
};

var Response = function Response(request) {
    _classCallCheck(this, Response);

    this.text = request.responseText;
    this.status = {
        text: request.statusText,
        code: request.status
    };

    this.url = request.responseURL;
    this.json = JSON.parse(request.responseText);
    this.xreq = request;
};

var Request =
// Define the defaults for all requests
function Request(_ref) {
    var _ref$method = _ref.method;
    var method = _ref$method === undefined ? '' : _ref$method;
    var _ref$data = _ref.data;
    var data = _ref$data === undefined ? {} : _ref$data;
    var _ref$address = _ref.address;
    var address = _ref$address === undefined ? '' : _ref$address;
    var _ref$options = _ref.options;
    var options = _ref$options === undefined ? {} : _ref$options;

    _classCallCheck(this, Request);

    // Make a new request with the data provided
    var request = new XMLHttpRequest();
    // Only if the method and address are provided
    if (method.length > 0 && address.length > 0) {
        // Return a Promise to the Caller
        return new Promise(function (resolve, reject) {
            // FIXME: Async flag should be a configurable option
            request.open(method, address, true);

            // For all the headers, add them to the request\
            for (var header in settings.headers) {
                // Add the Header
                request.setRequestHeader(header, settings.headers[header]);
            }

            // Define when to call resolve and when to call reject
            request.onload = function () {
                var response = new Response(request);
                resolve(response);
            };

            request.onerror = function () {
                var response = new Response(request);
                reject(response);
            };

            // Send the request!
            if (Object.keys(data).length > 0) {
                request.send(JSON.stringify(data));
            } else {
                request.send();
            }
        });
    }
};

var Net = (function () {
    function Net() {
        _classCallCheck(this, Net);
    }

    _createClass(Net, null, [{
        key: 'setup',
        value: function setup(options) {
            // TODO: Allow the setup for all default requests to reject with
            // one function, but also override in the promise

            for (var option in options) {
                settings[option] = options[option];
            }
        }
    }, {
        key: 'get',
        value: function get(url) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (url.length > 0) {
                return new Request({
                    method: 'GET',
                    address: url,
                    options: options
                });
            }

            return false;
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            if (url.length > 0) {
                return new Request({
                    method: 'POST',
                    data: data,
                    address: url,
                    options: options
                });
            }

            return false;
        }
    }]);

    return Net;
})();
