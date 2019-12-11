"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(count) {
        this.count = count;
        this.vals = new Array();
    }
    Vector.prototype.set = function (index, val) {
        this.vals[index] = val;
    };
    Vector.prototype.get = function (index) {
        return this.vals[index];
    };
    return Vector;
}());
exports.Vector = Vector;
//# sourceMappingURL=tslib.js.map