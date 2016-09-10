class NetResponse {
    constructor(request, debug = false) {
        this.text = request.responseText;

        this.status = {
            text: request.statusText,
            code: request.status
        };

        this.url = request.responseURL;
        this.json = null;

        try {
            this.json = JSON.parse(request.responseText);
        } catch (e) {
            if (this.debug) {
                console.warn('Failed to parse JSON', e);
            }
        }

        this.status.successful = (this.status.code < 309);

        this.xreq = request;
    }

    log() {
        const color = this.status.successful ? 'green' : 'red';
        console.log(
            `%c ${this.status.code} ${this.status.text} ${this.url}\n`,
            "color:" + color, {
                'data': this.json
            }
        );
    }
}

class NetRequest {
    // Define the defaults for all requests
    constructor(method, address, data, headers, debug) {
        // Make a new request with the data provided
        this.request = new XMLHttpRequest();
        this.response = null;

        // Check method valid
        if (!__NET_ALLOWED_METHODS.has(method)) {
            console.warn(`Sorry, '${method}' is not a supported HTTP method`);
            return false;
        }

        // make sure address is a string and not empty
        if (!(typeof address === 'string' && address.length > 0)) {
            console.warn(`Sorry, '${address}' is not a supported HTTP address`);
            return false;
        }

        // log the request if debugging is on
        if (debug) {
            console.log(`%c ${method} ${address}`, "color:blue", {
                "data": data,
                "headers": headers
            });
        }

        // Return a Promise to the Caller
        return new Promise((resolve, reject) => {
            this.request.open(method, address, true);

            // For all the headers, add them to the request
            if (typeof headers === 'object') {
                for (const header in headers) {
                    this.request.setRequestHeader(header, headers[header]);
                }
            }

            // Define when to call resolve and when to call reject
            this.request.onload = () => {
                this.response = new NetResponse(this.request);
                resolve(this.response);

                // log the request if debugging is on
                if (debug) this.response.log();
            };

            this.request.onerror = () => {
                this.response = new NetResponse(this.request);
                reject(this.response);

                // log the request if debugging is on
                if (debug) this.response.log();
            };

            // Send the request!
            try {
                if (typeof data === 'object') {
                    this.request.send(JSON.stringify(data));
                } else {
                    this.request.send();
                }
            } catch (e) {
                console.warn('Failed to send request', e);
            }
        });
    }
}

class Net {
    constructor(root, headers) {
        // Define the default headers for NetRequests
        this.headers = headers || {
            'Content-Type': 'application/json'
        };
        this.config = {
            'debug': false,
            'history': false
        };
        this.root = root || null;
    }

    setup(config) {
        // make sure config is present and is an object
        if (!(config && typeof(config) === 'object')) {
            console.warn(e);
            return;
        }

        this.config.debug = config.debug || false;
        this.config.history = config.history || false;
    }

    setHeaders(headers) {
        // combine provided headers and default headers
        this.headers = {...this.headers,
            ...headers
        }
        return true;
    }

    request(path, method, data, headers) { // Override certain headers
        try {
            return new NetRequest(
                method,
                (typeof this.root === 'string') ? `${this.root}${path}` : path,
                data || null,
                (typeof headers === 'object') ? {...this.headers,
                    ...headers
                } : this.headers,
                this.config.debug
            );
        } catch (e) {
            console.warn(e);
        }

        return false;
    }

    get(path, data, headers) {
        return this.request(path, 'GET', data, headers);
    }

    post(path, data, headers) {
        return this.request(path, 'POST', data, headers);
    }

    put(path, data, headers) {
        return this.request(path, 'PUT', data, headers);
    }

    patch(path, data, headers) {
        return this.request(path, 'PATCH', data, headers);
    }

    delete(path, data, headers) {
        return this.request(path, 'DELETE', data, headers);
    }
}

const __NET_ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
const __NET_AUTHORS = new Set(['David Hariri']);
