# Go
Go is a JavaScript library for making XHR requests more semantic and more fun. You can think of it as a micro-library for making AJAX requests. It uses **promises** instead of callbacks so your eyes won't bleed. Oh also, it comes in at x minified making it very portable and light.

I made it because JQuery's ajax libraries has a lot of bloat after trying to appeal to all browsers and all developers. I also made it because saying "go.get" instead of "$.get()" is way more fun.

After including **go.js** or **go.tiny.js** you can use it with a call like:

```
  go.get('/giraffes').then((giraffes) => {
    JSON.parse(giraffes).forEach((giraffe) => {
      console.log(giraffe);
    });
  })
```
