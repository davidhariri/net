#Net
##Testing
Net is a browser plug in so testing outside of the browser seemed ill-advised. Instead, open up the **/test/test.html** in your browser and open your console to see the results of the tests.

##About
Net is a JavaScript library for making XHR requests. It's goals are to be minimal, easy to use and fun to develop with. It was developed to meet the needs of modern web applications in a browser environment. You can think of it as a micro-library for making your traditional `$.ajax` JQuery requests, but without the bloat of JQuery. It also uses promises instead of callbacks so your eyes won't bleed and it's small (1kb minified), so it won't make your app slow to load.

##Quick Start
Install Net like this:
```shell
npm install net.js --save
```

After including **build/net.js** or **build/net.min.js** in your project you can use it like this:

```js
Net
.get('https://api.giraffefacts.com/facts')
.then((facts) => {
    this.forEach((fact) => {
        console.log(fact);
    });
});
```

You could also rename Net to anything you like:
```js
var PANTS = Net;

PANTS.get(...).then(...);
```

##Global Setup
```js
Net.setup({
    headers : {
        'Authorization' : `Basic ${window.atob('giraffes')}`,
        'Content-Type' : 'application/json'
    },
    reject(reason) {
        // This is where you could globally handle all request rejections
    }
});
```

##Use
Net always returns a promise making it easy to catch errors, chain functions and write cleaner code. Check out the following example:

```js
Net
.get('https://api.dhariri.com/articles/')
.then((articles) => {
    // Request succeeded, do something with 'articles'
}, (reason) => {
    // Something bad happened
    console.log(reason);
});
```
