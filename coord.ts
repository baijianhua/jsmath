class Point{
    constructor(public x:number,public y:number){
        this.x = x;
        this.y = y;
    }
}


class Coord{
    marginInPixel = 5;
    pxPerUnit = 20;
    minX = -5;
    minY = -5 ;
    private _baseXinPx;
    private _baseYinPx;
    private _widthPx;
    private  _heightPx;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor(){
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
    }
    /**绘制坐标系*/
     paint(){
         this._widthPx = this.canvas.width;
         this._heightPx = this.canvas.height;
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
    drawLine(x:number,y:number){
        // 　　1、绘制线条时，采用线条中点定位的方式，所以造成模糊，刚才引用的博文也说得很清楚，只需要坐标偏移到0.5，那么1px宽度的线条就不会出现模糊，
        // 　　比如画一个矩形边框，那么正确的做法就是x和y各偏移0.5，高和宽各缩小1即可，比如，我们要绘制一个20*30的矩形，就应该使用ctx.strokeRect(0.5,0.5,20,30)
        // 　　2、填充矩形，这个和绘制线条又不一样了，给定的坐标就真的是填充的边界，比如刚才举的例子，ctx.fillRect(0.5,0.5,20,30)，如果这样调用，肯定是会模糊的
        // 　　所以这个时候就应该改成ctx.fillRect(0,0,20,30)
        this.ctx.strokeStyle = (x === 0 || y === 0)?"black":"lightgray"; 
        this.ctx.lineWidth   = (x === 0 || y === 0)? 1:0.5;
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
        this.ctx.beginPath();
        this.ctx.moveTo(startX,startY);
        this.ctx.lineTo( endX,endY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    
    drawVector(x:number,y:number){
        //将x,y坐标转化为像素的xy坐标然后绘制      
        let pt = this.toScreenPoint(x,y);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";
        console.log("base x="+this._baseXinPx+" baseY="+this._baseYinPx+ "  pt.x="+pt.x+"  pt.y="+pt.y);
        this.ctx.beginPath();
        this.ctx.moveTo(this._baseYinPx,this._baseXinPx);
        this.ctx.lineTo(pt.x,pt.y);
        this.ctx.stroke();
        this.ctx.closePath();
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