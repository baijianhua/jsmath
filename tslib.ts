class Vector{
    private vals = new Array<number|string>();
    constructor(private count:number){

    }

    set(index:number,val:number|string){
        this.vals[index] = val;
    }
    get(index:number):number|string{
        return this.vals[index];
    }
}



