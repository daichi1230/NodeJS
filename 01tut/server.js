//How NOdejs differs from Vanilla JS
//1) Node runs on the server, not in the browser
//2) The console is the terminal window
//3) global object instead of window object
//4) Has common Core modules that we will explore
// 5) CommonJS modules instead of ES6 modules

// const os = require('os');
// const path = require('path');
// const math = require('./math');
const { add, subtract, multiply, divide} = require('./math');

console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(divide(2,3))