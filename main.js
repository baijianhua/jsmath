//https://blog.csdn.net/zgz682000/article/details/81223266 jsdoc
//javascript 有源代码，无需运行环境，但是没有类型
//如果浏览器原生支持 typescript多好，就不必用这个东西了。有这几个东西
//https://stackoverflow.com/questions/14015899/embed-typescript-code-in-an-html-document
//https://stackoverflow.com/questions/22885955/typescript-support-in-modern-browsers

//canvas 例子
//https://blog.csdn.net/weixin_43960657/article/details/89309983

//使用VsCode, JsDoc, Js Refactor, Darcula Theme

/**js还是太蹩脚了，
 * 没有类型系统，要虚拟一个，
 * 没有变量是否定义的检查，
 * 没有private
 */

/**@type {HTMLCanvasElement} */        
let canvas ;
/**@type {CanvasRenderingContext2D} */ 
let ctx ;
window.onload = main;

class Point{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Coord{
    /**@type {number} */  marginInPixel = 5;
    /**@type {number} */  pxPerUnit = 20;
    /**@type {number} */  minX = -5;
    /**@type {number} */  minY = -5 ;
    /**@type {number} */  _baseXinPx;
    /**@type {number} */  _baseYinPx;
    /**@type {number} */  _widthPx;
    /**@type {number} */  _heightPx;
    
    /**绘制坐标系*/
     paint(){
         this._widthPx = canvas.width;
         this._heightPx = canvas.height;
         console.log("canvas width="+this._widthPx+" canvas Height="+this._heightPx);
         let totalXUnits = (this._widthPx - 2*this.marginInPixel)/this.pxPerUnit;
         let totalYUnits = (this._heightPx - 2*this.marginInPixel)/this.pxPerUnit;
         console.log("totalY="+totalYUnits);
         //ctx.beginPath()
         //计算x轴纵坐标
         this._baseXinPx = (totalXUnits - Math.abs(this.minX))* this.pxPerUnit; //最大是maxY个刻度，每个刻度是多少
         this._baseYinPx = this.pxPerUnit * Math.abs(this.minX); //从minX数多少个刻度
        //  console.log("x pos="+this.baseXinPx);
        for(let x = this.minX; x <= totalXUnits; x++){
            this.drawLine(x,null);
         }
         for(let y = this.minY; y<= totalYUnits; y++){
            this.drawLine(null,y);
         }

         this.drawVector(5,5);
     }

    /**
     * 用数学坐标绘制一条线。如果仅仅指定x,y为任意值，那就是绘制横线
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number | null} x 
     * @param {number | null} y 
     */
    drawLine(x,y){
        // 　　1、绘制线条时，采用线条中点定位的方式，所以造成模糊，刚才引用的博文也说得很清楚，只需要坐标偏移到0.5，那么1px宽度的线条就不会出现模糊，
        // 　　比如画一个矩形边框，那么正确的做法就是x和y各偏移0.5，高和宽各缩小1即可，比如，我们要绘制一个20*30的矩形，就应该使用ctx.strokeRect(0.5,0.5,20,30)
        // 　　2、填充矩形，这个和绘制线条又不一样了，给定的坐标就真的是填充的边界，比如刚才举的例子，ctx.fillRect(0.5,0.5,20,30)，如果这样调用，肯定是会模糊的
        // 　　所以这个时候就应该改成ctx.fillRect(0,0,20,30)
        ctx.strokeStyle = (x === 0 || y === 0)?"black":"lightgray"; 
        ctx.lineWidth   = (x === 0 || y === 0)? 1:0.5;
        /**@type {number} */
        let startX, startY, endX, endY;
        if(y == null)
        {
            startY = endY = this._baseXinPx-x*this.pxPerUnit+0.5;
            startX = this.marginInPixel + 0.5;
            endX = this._widthPx - this.marginInPixel+0.5
            //纵坐标不变，横贯画布
        }else if(x == null){
            //纵贯画布
            startX = endX =  this._baseYinPx + y * this.pxPerUnit + 0.5;
            startY = this.marginInPixel+0.5;
            endY =this._heightPx - this.marginInPixel+0.5;
        }
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo( endX,endY);
        ctx.stroke();
        ctx.closePath();
    }
    /**
     * 绘制一个向量。从原点出发，到x,y位置
     * @param {number} x 
     * @param {number} y 
     */
    drawVector(x,y){
        //将x,y坐标转化为像素的xy坐标然后绘制      
        let pt = this.toScreenPoint(x,y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        console.log("base x="+this._baseXinPx+" baseY="+this._baseYinPx+ "  pt.x="+pt.x+"  pt.y="+pt.y);
        ctx.beginPath();
        ctx.moveTo(this._baseYinPx,this._baseXinPx);
        ctx.lineTo(pt.x,pt.y);
        ctx.stroke();
        ctx.closePath();
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Point}
     */
    toScreenPoint(x,y){
        return new Point(this._baseYinPx+(x)*this.pxPerUnit,this._baseXinPx-(y)*this.pxPerUnit);      
    }
}
let coord = new Coord();


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


//绘制坐标轴，起点、边距、刻度线
function drawAxis(){

}