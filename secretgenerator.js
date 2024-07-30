/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Just a file to generate secrets for JWT.

const crypto = require("crypto");
console.log(crypto.randomBytes(64).toString("hex"));