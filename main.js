//https://blog.csdn.net/zgz682000/article/details/81223266 jsdoc
//javascript 有源代码，无需运行环境，但是没有类型
//如果浏览器原生支持 typescript多好，就不必用这个东西了。有这几个东西
//https://stackoverflow.com/questions/14015899/embed-typescript-code-in-an-html-document
//https://stackoverflow.com/questions/22885955/typescript-support-in-modern-browsers

//canvas 例子
//https://blog.csdn.net/weixin_43960657/article/details/89309983

/**@type {HTMLCanvasElement} */        
let canvas ;
/**@type {CanvasRenderingContext2D} */ 
let ctx ;
window.onload = main;

class Point{
    /**@type {number} */  x;
    /**@type {number} */  y;
}

class Coord{
    /**@type {number} */  
    marginInPixel = 5;
    /**@type {number} */  minX = -5;
    /**@type {number} */  maxX = 20;
    /**@type {number} */  minY = -5 ;
    /**@type {number} */  maxY = 20 ;
    /**
     * 一个单位的像素数
     * @type {number} 
     */ 
     pixelPerUnit = 20 ;
     /**绘制坐标系*/
     paint(){
         let widthPx = canvas.width;
         let heightPx = canvas.height;
         console.log("canvas width="+widthPx+" canvas Height="+heightPx);
         let totalXUnits = this.maxX - this.minX;
         let totalYUnits = this.maxY - this.minY;
         console.log("totalY="+totalYUnits);
         //ctx.beginPath()
         //计算x轴纵坐标
         let xAxisY = (heightPx - 2*this.marginInPixel)/totalYUnits*this.maxY;
         let yAxisX = (widthPx  - 2*this.marginInPixel)/totalXUnits*Math.abs(this.minX);
         console.log("x pos="+xAxisY);
         ctx.beginPath();
         //ctx.strokeStyle = "red";
         //ctx.fillStyle = "black";
         //绘制x轴
         ctx.lineWidth = 1;
         ctx.moveTo(this.marginInPixel+0.5,xAxisY+0.5);
         ctx.lineTo(widthPx - this.marginInPixel+0.5,xAxisY+0.5);
         ctx.stroke();
         ctx.closePath();

         //绘制y轴
         ctx.moveTo(this.marginInPixel+yAxisX+0.5,this.marginInPixel+0.5);
         ctx.lineTo(this.marginInPixel+yAxisX+0.5,heightPx - this.marginInPixel+0.5);
         ctx.stroke();
         ctx.closePath();

         //绘制刻度

         //绘制网格

         //ctx.strokeRect(100.5,100.5,200,300);
         //ctx.fillRect(10,10,60,60);
         //计算y轴横坐标   


// 　　1、绘制线条时，采用线条中点定位的方式，所以造成模糊，刚才引用的博文也说得很清楚，只需要坐标偏移到0.5，那么1px宽度的线条就不会出现模糊，
// 　　比如画一个矩形边框，那么正确的做法就是x和y各偏移0.5，高和宽各缩小1即可，比如，我们要绘制一个20*30的矩形，就应该使用ctx.strokeRect(0.5,0.5,20,30)
// 　　2、填充矩形，这个和绘制线条又不一样了，给定的坐标就真的是填充的边界，比如刚才举的例子，ctx.fillRect(0.5,0.5,20,30)，如果这样调用，肯定是会模糊的
// 　　所以这个时候就应该改成ctx.fillRect(0,0,20,30)
     }
}
let coord = new Coord();

//用数学坐标绘制一条线。如果仅仅指定x,y为任意值，那就是绘制横线
/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number | null} x 
 * @param {number | null} y 
 */
function drawLine(ctx,x,y){
    //要把x转化为屏幕坐标的x， 
    if(y == null)
    {

    }
}
function main(){
    console.log("document is ready");
    canvas  = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    coord.paint();
}

function button_clicked(){
    console.log("button clicked");
    console.log(JSON.stringify(toScreenPoint(1,2)));
    let gd = ctx;

    gd.beginPath();
    gd.lineWidth=1;
    gd.lineCap="butt";
    gd.moveTo(50,50)
    gd.lineTo(150,50)
    gd.stroke();
    gd.closePath();
}

function toScreenPoint(x,y){
    return {x:x*2,y:y*3};
}
//绘制坐标轴，起点、边距、刻度线
function drawAxis(){

}