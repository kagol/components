import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// import { EditorModule } from './editor/editor.module';
// import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { PaginationModule } from './components/pagination/pagination.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ButtonComponent } from './components/pagination/button.component';
import { PagerComponent } from './components/pagination/pager.component';
import { ListModule } from './components/list/list.module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    ButtonComponent,
    PagerComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginationModule,
    ListModule,
    // EditorModule,
    // LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
