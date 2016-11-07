// A simple class for testing Net methods
class Test {
    constructor(assertion, description) {
        this.passed = false;
        this.assertion = assertion;
        this.description = description;
    }

    run() {
        this.description = `%c${this.description}`;

        if(this.assertion) {
            this.passed = true;
        }

        // Log the result of the test
        console.log(`${this.description}: ${this.passed ? '✔' : '✘'}`, `color:${this.passed ? 'green' : 'red'}`);
    }
}

const PANTS = new Net();

// Test getting a webpage
// Should result in a 200, but not be json
PANTS
.get('https://dhariri.com/')
.then(function(response) {
    const getHTMLTest = new Test((response.text.length > 0), 'Getting valid HTML').run();
}).catch(function(response) {
    console.log(response);
});

// Test getting some JSON
// Should result in a 200 and have a json object
PANTS
.get('https://api.dhariri.com/articles/')
.then(function(response) {
    const getJSONTest = new Test((response.json), 'Getting valid JSON').run();
});

// Test instantiating Net with some parameters set
const SHIRT = new Net(
    'https://api.dhariri.com/',
    {
        'Content-Type' : 'application/json',
        'Custom-Header' : 'boogers'
    }
);

const testInitHeadersSet = new Test((SHIRT.headers['Custom-Header'] === 'boogers'), 'Setting a default header').run();
const rootSet = new Test((SHIRT.root === 'https://api.dhariri.com/'), 'Setting a root').run();

SHIRT.setHeaders({
    'Shirt-Type' : 'Hawaiian'
});

// Test that setting a new header works and doesn't override other headers
const testHeadersSet = new Test((SHIRT.headers['Shirt-Type'] === 'Hawaiian' && SHIRT.headers['Custom-Header'] === 'boogers'), 'Setting a custom header later on').run();

// Test getting stuff with custom headers
SHIRT
.get('articles/')
.then(function(response) {
    const getJSONTest = new Test((response.json), 'Getting valid JSON with root and custom header').run();
});