import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'editor', 
    // component: AppComponent, 
    // children: [
    //   { path: 'editor', component: EditorComponent },
    //   { path: 'layout', component: LayoutComponent }
    // ] 
    loadChildren: './editor/editor.module#EditorModule',
    // loadChildren: () => import('./editor/editor.module').then(mod => mod.EditorModule),
  },
  {
    path: 'layout',
    loadChildren: './layout/layout.module#LayoutModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
