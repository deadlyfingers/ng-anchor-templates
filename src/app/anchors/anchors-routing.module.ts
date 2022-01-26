import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnchorsComponent } from './anchors.component';

// routes for lazy loading
const routes: Routes = [
  {
    path: '',
    component: AnchorsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnchorsRoutingModule { }
