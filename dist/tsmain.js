"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("./tslib");
function tsmain() {
    var v = new tslib_1.Vector(2);
    v.set(1, "a");
    v.set(2, 3);
    console.log("v.get1=" + v.get(1) + " 2=" + v.get(2));
    console.log("hello,this is in ts main");
}
document.onload = function () { return tsmain(); };
console.log("haha");
//# sourceMappingURL=tsmain.js.map