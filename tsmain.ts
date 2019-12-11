import {Vector} from "./tslib";

function tsmain(){
    let v = new Vector(2);
    v.set(1,"a");
    v.set(2,3);
    console.log("v.get1="+v.get(1)+" 2="+v.get(2));
    console.log("hello,this is in ts main");
}

document.onload = ()=>tsmain();
console.log("haha");
