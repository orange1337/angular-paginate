import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagintion } from './pagination';

@Component({
  selector: 'angular-paginate',
  template: `
<div class="pagination" [attr.style]="getStyles()" [class.disable]="isPaginationDisable">
    <a class="pagination__link" [attr.style]="getElementStyle()" (click)="setActivePage(firstPage)">&laquo;</a>
    <a class="pagination__link xs-none" [attr.style]="getElementStyle()" *ngIf="isFirstSectionVisible" (click)="setActivePage(firstPage)">{{firstPage}}</a>
    <a class="pagination__link xs-none" [attr.style]="getElementStyle()" *ngIf="isFirstSectionVisible" (click)="setActivePage(firstPage+1)">{{firstPage+1}}</a>
    <a class="pagination__link xs-none cursor-disabled" [attr.style]="getElementStyle()" *ngIf="isFirstSectionVisible">...</a>
    <a class="pagination__link" *ngFor="let page of pages"  [attr.style]="page==activePage?getActiveStyle():getElementStyle()" [class.active]="page==activePage" (click)="setActivePage(page)">{{page}}</a>
    <a class="pagination__link xs-none cursor-disabled" [attr.style]="getElementStyle()" *ngIf="isLastSectionVisible">...</a>
    <a class="pagination__link xs-none" [attr.style]="getElementStyle()" *ngIf="isLastSectionVisible" (click)="setActivePage(lastPage-1)">{{lastPage-1}}</a>
    <a class="pagination__link xs-none" [attr.style]="getElementStyle()" *ngIf="isLastSectionVisible" (click)="setActivePage(lastPage)">{{lastPage}}</a>
    <a class="pagination__link" [attr.style]="getElementStyle()" (click)="setActivePage(lastPage)">&raquo;</a>
</div>
  `,
  styleUrls: ['./angular-paginate.component.scss']
})
export class AngularPaginateComponent implements OnInit,OnChanges {
  
  @Input() totalPages:number;
  @Input() maximumShowAblePage:number;

  @Input() color:string;
  @Input() backgroundColor:string;
  @Input() borderColor:string;
  @Input() activeTextColor:string;
  @Input() activeBackgroundColor:string;
  @Input() activeBorderColor:string;
  @Output() activePageNumber:EventEmitter<number>;

  private _pagination:Pagintion;
  private _pages:Array<number>;

  private _isPaginationDisable:boolean;  
  private _isFirstSectionVisible:boolean;
  private _isLastSectionVisible:boolean;

  constructor() { 
    this._pagination=new Pagintion();
    this._pages=new Array();
    this.activePageNumber=new EventEmitter();
    this._isPaginationDisable=false;
    this._isFirstSectionVisible=false;
    this._isLastSectionVisible=false;
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.totalPages!=undefined){
      if(changes.totalPages.currentValue!=changes.totalPages.previousValue){
        this._pagination.totalPages=changes.totalPages.currentValue;
        changes.totalPages.currentValue<=0?this._isPaginationDisable=true:this._isPaginationDisable=false;
        this._pages=this._pagination.getPages(this.activePage);
      }
    }
    if(changes.maximumShowAblePage!=undefined){
      if(changes.maximumShowAblePage.currentValue!=changes.maximumShowAblePage.previousValue){
        changes.maximumShowAblePage.currentValue!=undefined&&changes.maximumShowAblePage.currentValue!=null&&typeof changes.maximumShowAblePage.currentValue=='number'?
        this._pagination.maxShowAblePage=changes.maximumShowAblePage.currentValue:null;
        this._pages=this._pagination.getPages(this.activePage);
      }
    }
  }
  setActivePage(page:number){
    this._pages=this._pagination.getPages(page);
    this._isFirstSectionVisible=this._pagination.isFirstSectionVisible;
    this._isLastSectionVisible=this._pagination.isLastSectionVisible;
    this.activePageNumber.emit(page);
  }
  getStyles(){
    return `color:${this.color} !important;`;
  }
  getElementStyle(){
    return `background-color:${this.backgroundColor} !important; border-color:${this.borderColor} !important;`;
  }
  getActiveStyle(){
    return `color:${this.activeTextColor} !important;background-color:${this.activeBackgroundColor} !important; border-color:${this.activeBorderColor} !important;`;
  }
  get pages():Array<number>{
    return this._pages;
  }
  get activePage():number{
    return this._pagination.activePage;
  }
  get isPaginationDisable():boolean{
    return this._isPaginationDisable;
  }
  get firstPage():number{
    return this._pagination.firstPage;
  }
  get lastPage():number{
    return this._pagination.totalPages;
  }
  get isFirstSectionVisible():boolean{
    return this._isFirstSectionVisible;
  }
  get isLastSectionVisible():boolean{
    return this._isLastSectionVisible;
  }
}
