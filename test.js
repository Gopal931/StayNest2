const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');

console.log("wrapAsync loaded:", typeof wrapAsync);
console.log("ExpressError loaded:", typeof ExpressError);

throw new ExpressError(400, "Testing error throwing");
