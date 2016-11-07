// A simple class for testing Net methods
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Test = (function () {
    function Test(assertion, description) {
        _classCallCheck(this, Test);

        this.passed = false;
        this.assertion = assertion;
        this.description = description;
    }

    _createClass(Test, [{
        key: 'run',
        value: function run() {
            this.description = '%c' + this.description;

            if (this.assertion) {
                this.passed = true;
            }

            // Log the result of the test
            console.log(this.description + ': ' + (this.passed ? '✔' : '✘'), 'color:' + (this.passed ? 'green' : 'red'));
        }
    }]);

    return Test;
})();

var PANTS = new Net();

// Test getting a webpage
// Should result in a 200, but not be json
PANTS.get('https://dhariri.com/').then(function (response) {
    var getHTMLTest = new Test(response.text.length > 0, 'Getting valid HTML').run();
})['catch'](function (response) {
    console.log(response);
});

// Test getting some JSON
// Should result in a 200 and have a json object
PANTS.get('https://api.dhariri.com/articles/').then(function (response) {
    var getJSONTest = new Test(response.json, 'Getting valid JSON').run();
});

// Test instantiating Net with some parameters set
var SHIRT = new Net('https://api.dhariri.com/', {
    'Content-Type': 'application/json',
    'Custom-Header': 'boogers'
});

var testInitHeadersSet = new Test(SHIRT.headers['Custom-Header'] === 'boogers', 'Setting a default header').run();
var rootSet = new Test(SHIRT.root === 'https://api.dhariri.com/', 'Setting a root').run();

SHIRT.setHeaders({
    'Shirt-Type': 'Hawaiian'
});

// Test that setting a new header works and doesn't override other headers
var testHeadersSet = new Test(SHIRT.headers['Shirt-Type'] === 'Hawaiian' && SHIRT.headers['Custom-Header'] === 'boogers', 'Setting a custom header later on').run();

// Test getting stuff with custom headers
SHIRT.get('articles/').then(function (response) {
    var getJSONTest = new Test(response.json, 'Getting valid JSON with root and custom header').run();
});
