# Go.js
Go is a JavaScript library for making JSON XHR requests more semantic and more fun. You can think of it as a micro-library for making AJAX requests. It uses **promises** instead of callbacks so your eyes won't bleed. Oh also, it comes in at x minified making it very portable and light.

I made it because JQuery's `$.ajax` libraries have a lot of bloat after trying to appeal to all browsers and all developers. I also made it because saying "go.get" instead of "$.get()" is a heck of a lot more fun to type.

After including **go.js** or **go.tiny.js** in your project you can use it with like this:

```js
  go
  .get('http://catfacts-api.appspot.com/api/facts')
  .then((facts) => {
    this.forEach((fact) => {
      console.log(fact);
    });
  });
  
  go
  .post({
    package : {
      'facts' : ["Has 9 whiskers", "Can breath real loud"]
    },
    to : 'http://catfacts-api.appspot.com/api/facts'
  })
  .then((facts) => {
    console.log('meow', this);
  });
```

Go is small. Really really small. This is because it assumes all you want to do with it is send and receive JSON to urls and nothing else.
