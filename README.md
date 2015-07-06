#Go.js
Go is a JavaScript library for making JSON-bearing XHR requests. It's goals are to be minimal, easy to write and fun to develop with. You can think of it as a micro-library for making your traditional `$.ajax` requests, but without the bloat of JQuery. It also uses promises instead of callbacks so your eyes won't bleed and it's small (16kb), so it won't make your app slow.

After including **go.js** or **go.tiny.js** in your project you can use it like this:

```js
go
.get('https://api.giraffefacts.com/facts')
.then((facts) => {
  this.forEach((fact) => {
    console.log(fact);
  });
});
```

Wasn't that fun? Go is small. *Really*, *really* small. This is because it assumes all you want to do with it is send and receive JSON to API's and nothing else. Check out the docs below:

##Set Up
```js
go.setup({
  headers : {
    'Authorization' : 'Basic '+window.atob('giraffes');
  },
  reject(reason) {
    // This is where you could handle all request rejections
    // You could always override this on any individual request
    // By specifying a second function in your .then() call
    console.log(reason);
  }
});
```
##Use
Go always returns a promise making it easy to catch errors, chain functions and write cleaner code. Behold the following example:
```js
go
.get('https://api.giraffefacts.com/facts')
.then((facts) => {
  this.forEach((fact) => {
    console.log(fact);
  });
}, (reason) => {
  // Something bad happened
  // This could be set as a default in setup
  console.log(reason);
});
```

In this example we're asking **go** to **get** some facts from the api and **then** when it's done, do something else. If things go awry we are asking go to fall into the second function we can specify. If you want to you can make this second function a global default.

##Methods
###Get
```js
// Think of this as "Go get something from an address"
go.get(url, options)
```

###Post, Patch, Put, Delete
```js
// Think of this as "Go post something to an address"
go[method](object, url, options);
```
