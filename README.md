# Angular-Paginate

![](https://photos.app.goo.gl/4ws2Evbkg7yKb4SeA)


# Usage

```hs
npm install angular-paginate --save
```

Import Module

```
import { AngularPaginateModule } from 'angular-paginate';
 
@NgModule({
  imports: [
    AngularPaginateModule
  ]
})
```
On Component

```hs
<angular-paginate [totalPages]="pages" [maximumShowAblePage]="pageCount"  (activePageNumber)="activePage($event)"></angular-paginate>
```

Default Veriables

```hs
{
DEFAULT_FIRSTPAGE:number=1;

DEFAULT_ACTIVEPAGE:number=1;

DEFAULT_MAXSHOWABLEPAGE:number=7;

DEFAULT_TOTALPAGES:number=0;
}

```