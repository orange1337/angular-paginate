export class Pagintion{

    private DEFAULT_FIRSTPAGE:number=1;
    private DEFAULT_ACTIVEPAGE:number=1;
    private DEFAULT_MAXSHOWABLEPAGE:number=7;
    private DEFAULT_TOTALPAGES:number=0;

    private _firstPage:number;
    private _activePageNumber:number;
    private _maxShowAblePage:number;
    private _totalPages:number;

    constructor(firstPage?:number,activePageNumber?:number,maxShowAblePage?:number,totalPage?:number){
        this._firstPage=firstPage==null||firstPage==undefined||typeof firstPage!='number'?this.DEFAULT_FIRSTPAGE:Math.floor(firstPage);
        this._activePageNumber=activePageNumber==null||activePageNumber==undefined||typeof activePageNumber!='number'?this.DEFAULT_ACTIVEPAGE:Math.floor(activePageNumber);
        this._maxShowAblePage=maxShowAblePage==null||maxShowAblePage==undefined||typeof maxShowAblePage!='number'?this.DEFAULT_MAXSHOWABLEPAGE:Math.floor(maxShowAblePage);
        this._totalPages=totalPage==null||totalPage==undefined||typeof totalPage!='number'?this.DEFAULT_TOTALPAGES:Math.floor(totalPage);
    }
    getPages(activePageNumber:number):Array<number>{
        let pageNumbers:Array<number>=new Array();
        if(this._totalPages===0||this._totalPages==null||this._totalPages==undefined) return pageNumbers;
        if(activePageNumber!==null||activePageNumber!==undefined) this._activePageNumber=activePageNumber;
        for(let i=this.getStartIndex();i<=this.getFinishIndex();i++){
            pageNumbers.push(i);
        }
        return pageNumbers;
    }
    private getStartIndex():number{
        if(this._activePageNumber-Math.floor(this._maxShowAblePage/2)<=0||this._maxShowAblePage>=this._totalPages){
            return this.DEFAULT_FIRSTPAGE;
        }else if(this._activePageNumber+Math.floor(this._maxShowAblePage/2)>this._totalPages){
            return this._totalPages-this._maxShowAblePage+this._maxShowAblePage%2;
        }else{
            return this._activePageNumber-Math.floor(this._maxShowAblePage/2);
        }
    }
    private getFinishIndex():number{
        if(this._activePageNumber<=Math.floor(this._maxShowAblePage/2)&&this._maxShowAblePage<this._totalPages){
            return this._maxShowAblePage+(this._maxShowAblePage+1)%2;
        }else if(this._activePageNumber+Math.floor(this._maxShowAblePage/2)>=this._totalPages||this._maxShowAblePage>=this._totalPages){
            return this._totalPages;
        }else{
            return this._activePageNumber+Math.floor(this._maxShowAblePage/2);
        }
    }
    get firstPage():number{
        return this._firstPage;
    }
    get activePage():number{
        return this._activePageNumber;
    }
    get maxShowAblePage():number{
        return this._maxShowAblePage;
    }
    get totalPages():number{
        return this._totalPages;
    }
    set firstPage(firstPage:number){
        firstPage!=null&&firstPage!=undefined&&typeof firstPage=='number'?
        this._firstPage=Math.floor(firstPage):null;
    }
    set activePage(activePage:number){
        activePage!=null&&activePage!=undefined&&typeof activePage=='number'?
        this._activePageNumber=Math.floor(activePage):null;
    }
    set maxShowAblePage(maxShowAblePage:number){
        maxShowAblePage!=null&&maxShowAblePage!=undefined&&typeof maxShowAblePage=='number'?
        this._maxShowAblePage=Math.floor(maxShowAblePage):null;
    }
    set totalPages(totalPages:number){
        totalPages!=null&&totalPages!=undefined&&typeof totalPages=='number'?
        this._totalPages=Math.floor(totalPages):null;
    }
}