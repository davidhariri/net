# Net
A light-weight networking library for the browser.

## Quick Start
Install Net like this:
```shell
npm install net.js --save
```

After including **build/net.min.js** in your project you can use it like this:

```js
var myAPI = new Net('https://api.dhariri.com/');

myAPI
.get('articles/')
.then((response) => {
    // Got 'em!
    response.json.articles.forEach((article) => {
        console.log(article);
    });
}).catch((error) => {
    // Something bad happened...
    console.log(error);
});
```

## HTTP Methods
Net supports the following HTTP methods: `GET`, `PUT`, `POST`, `PATCH`, and `DELETE`. You can call them by their lowercase Net method counterparts. _Example:_ `Net.post()` or `Net.delete()`

## Convenience
If you find yourself attaching similar headers to every request (like authorization headers, for example) you can use the constructor to set up some default headers:

```js
const myAPI = new Net(
    'https://api.dhariri.com/', // Specify a root to prepend to all requests
    {
        'Authorization' : `Basic ${window.atob('giraffes')}`,
        'Content-Type' : 'application/json'
    }
);

myAPI
.get('articles/')
.then((response) => {
    response.json.articles.forEach((article) => {
        console.log(article.title);
    });
});
```

You can set these at any time (for example, when a user logs in) by calling `Net.setHeaders(headers)`:

```js
myAPI
.setHeaders({
    'Authorization' : `Basic ${window.atob('giraffes')}`
});

myAPI
.get('secrets/')
.then((response) => {
    // Got them secrets
});
```
