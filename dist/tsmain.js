// import {Vector} from "./tslib" //can not use this. won't work
console.log("haha");
function tsmain() {
    var v = new Vector(2);
    v.set(1, "a");
    v.set(2, 3);
    console.log("v.get1=" + v.get(1) + " 2=" + v.get(2));
    console.log("hello,this is in ts main");
    var coord = new Coord();
    coord.paint();
}
function button_clicked() {
    console.log("button clicked");
}
//# sourceMappingURL=tsmain.js.map