import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagintion } from './pagination';

@Component({
  selector: 'angular-paginate',
  template: `
    <div class="pagination">
        <a class="pagination__link" [class.disable]="isPaginationDisable" (click)="setActivePage(firstPage)">&laquo;</a>
        <a class="pagination__link" *ngFor="let page of pages" [class.active]="page==activePage" (click)="setActivePage(page)">{{page}}</a>
        <a class="pagination__link" [class.disable]="isPaginationDisable" (click)="setActivePage(lastPage)">&raquo;</a>
    </div>
  `,
  styleUrls: ['./angular-paginate.component.scss']
})
export class AngularPaginateComponent implements OnInit,OnChanges {
  @Input() totalPages:number;
  @Input() maximumShowAblePage:number;
  @Output() activePageNumber:EventEmitter<number>;

  private _pagination:Pagintion;
  private _pages:Array<number>;
  private _isPaginationDisable:boolean;

  constructor() { 
    this._pagination=new Pagintion();
    this._pages=new Array();
    this.activePageNumber=new EventEmitter();
    this._isPaginationDisable=false;
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.totalPages.currentValue!=changes.totalPages.previousValue){
      this._pagination.totalPages=changes.totalPages.currentValue;
      changes.totalPages.currentValue<=0?this._isPaginationDisable=true:this._isPaginationDisable=false;
      this._pages=this._pagination.getPages(this.activePage);
    }
    if(changes.maximumShowAblePage.currentValue!=changes.maximumShowAblePage.previousValue){
      changes.maximumShowAblePage.currentValue!=undefined&&changes.maximumShowAblePage.currentValue!=null&&typeof changes.maximumShowAblePage.currentValue=='number'?
      this._pagination.maxShowAblePage=changes.maximumShowAblePage.currentValue:null;
      this._pages=this._pagination.getPages(this.activePage);
    }
  }
  setActivePage(page:number){
    this._pages=this._pagination.getPages(page);
    this.activePageNumber.emit(page);
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
}
