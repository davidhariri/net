#Net
##Testing
Because this package is meant for a browser environment, I felt it was best to test in a browser. This means we have no prescribed method for testing. Test however you like!

##About
Net is a JavaScript library for making JSON-bearing XHR requests. It's goals are to be minimal, easy to write and fun to develop with. It was developed to meet the needs of modern web applications in a browser environment. You can think of it as a micro-library for making your traditional `$.ajax` JQuery requests, but without the bloat of JQuery. It also uses promises instead of callbacks so your eyes won't bleed and it's small (1kb minified), so it won't make your app slow.

##Quick Start
After including **net.js** or **net.min.js** in your project you can use it like this:

```js
Net
.get('https://api.giraffefacts.com/facts')
.then((facts) => {
  this.forEach((fact) => {
    console.log(fact);
  });
});

// You could also rename Net to anything you like:
// var PANTS = Net;
// PANTS.get(...).then(...);

```

##Set Up
```js
Net.setup({
  headers : {
    'Authorization' : `Basic ${window.atob('giraffes')}`;
  },
  reject(reason) {
    // This is where you could globally handle all request rejections

    // You could always override this on any individual request
    // By specifying a second function in your .then() call:

    // Net.get(...).then((response) => {
    //     // The request was successful.
    // }, (error) => {
    //     // The request was rejected.
    // })
  }
});
```
##Use
Net always returns a promise making it easy to catch errors, chain functions and write cleaner code. Behold the following example:
```js
Net
.get('https://api.giraffefacts.com/facts')
.then((facts) => {
  facts.map((fact) => {
    console.log(fact);
  });
}, (reason) => {
  // Something bad happened
  console.log(reason);
});
```
