# walla

**Bundle less web apps with SSR without any tooling**

This is a draft for a framework without any (or optional) bundling or tooling yet flexible, performant and proper server side rendering (SSR).

Using Server Side Includes (ssi), supported in both NGINX and Apache, web pages render properly on the server and come to life with JavaScript.

```html
<!doctype html>
<html>
<head>
  <title>Welcome</title>
  <script type="module" src="/index.js"></script>
</head>
<body>
  <!--#include virtual="/components/header/index.html" -->
  <h1>Hello planet!</h1>
  <!--#include virtual="/components/footer/index.html" -->
</body>
</html>
```

Included are examples with NGINX, Apache (both supporting ssi) and Node.js (client side rendering).

Run the example in docker with `docker-compose up` to try it out. All file changes are reflected immediately without any need for bundling och installing dependencies.

- http://localhost:3000 (node)
- http://localhost:4000 (nginx)
- http://localhost:5000 (apache)
