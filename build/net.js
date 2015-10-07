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
    headers: {},
    type: 'application/x-www-form-urlencoded; charset=UTF-8'
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

            // For all the headers, add them to the request
            for (var header in settings.headers) {
                var content = headers[header];
                // Add the Header
                request.setRequestHeader(header, content);
            }

            // Define when to call resolve and when to call reject
            request.onload = function () {
                var response = request.responseText;

                // TODO: Allow the user to flag off the auto-parser
                if (response[0] === "{" || response[0] === "[") {
                    response = JSON.parse(response);
                }

                resolve(response);
            };

            request.onerror = function () {
                var response = request.responseText;
                reject(response);
            };

            // Send the request!
            request.send();
        });
    }
};

var Net = (function () {
    function Net() {
        _classCallCheck(this, Net);
    }

    // export function options(url, options) {
    //
    // }

    // export function head(url, options) {
    //
    // }
    //
    // export function post(url, options) {
    //
    // }
    //
    // export function put(url, options) {
    //
    // }
    //
    // export function patch(url, options) {
    //
    // }
    //
    // export function delete(url, options) {
    //
    // }

    _createClass(Net, null, [{
        key: 'setup',
        value: function setup(options) {
            // TODO: Allow the setup for all default requests
            for (var option in options) {
                settings[option] = options[option];
            }

            // Show what we're using as our default settings for all requests
            return settings;
        }
    }, {
        key: 'get',
        value: function get(url, options) {
            if (url.length > 0) {
                return new Request({
                    method: 'GET',
                    address: url,
                    options: options
                });
            }

            return false;
        }
    }]);

    return Net;
})();
