import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularPaginateComponent } from './angular-paginate.component';



@NgModule({
  declarations: [
    AngularPaginateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AngularPaginateComponent
  ]
})
export class AngularPaginateModule { }
