import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { TableComponent } from './table/table.component';
import { QuickMenuComponent } from './quick-menu/quick-menu.component';

const routes: Routes = [
  { 
    path: '', 
    component: EditorComponent, 
    children: [
      { path: 'table', component: TableComponent },
      { path: 'quick-menu', component: QuickMenuComponent }
    ] 
  },
];

@NgModule({
  declarations: [
    EditorComponent,
    TableComponent,
    QuickMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditorModule { }
