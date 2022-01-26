import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// lazy loading
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./anchors/anchors.module').then(m => m.AnchorsModule),
    data: {
      title: 'Anchors',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
