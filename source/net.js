// © David Hariri, 2015
// Developed while working on Volley

// TODO: Publish to NPM
// TODO: Better error handling
// {{Node Requirements}}

// Define some default settings to use which can be overridden in setup
const settings = {
    headers : {},
    type : 'application/x-www-form-urlencoded; charset=UTF-8'
}

class Response {
    constructor(request) {
        this.text = request.responseText;
        this.status = {
            text : request.statusText,
            code : request.status
        };

        this.json = JSON.parse(request.responseText);
        this.xreq = request;
    }
}

class Request {
    // Define the defaults for all requests
    constructor({method = '', data = {}, address='', options = {}}) {
        // Make a new request with the data provided
        const request = new XMLHttpRequest();
        // Only if the method and address are provided
        if(method.length > 0 && address.length > 0) {
            // Return a Promise to the Caller
            return new Promise((resolve, reject) => {
                // FIXME: Async flag should be a configurable option
                request.open(method, address, true);

                // For all the headers, add them to the request\
                for(const header in settings.headers) {
                    // Add the Header
                    request.setRequestHeader(header, settings.headers[header]);
                }

                // Define when to call resolve and when to call reject
                request.onload = function() {
                    const response = new Response(request);
                    resolve(response);
                };

                request.onerror = function() {
                    const response = new Response(request);
                    reject(response);
                }

                // Send the request!
                request.send();
            });
        }
    }
}

class Net {
    static setup(options) {
        // TODO: Allow the setup for all default requests to reject with
        // one function, but also override in the promise

        for(const option in options) {
            settings[option] = options[option];
        }
    }

    static get(url, options = {}) {
        if(url.length > 0) {
            return new Request({
                method : 'GET',
                address : url,
                options : options
            });
        }

        return false;
    }
}
