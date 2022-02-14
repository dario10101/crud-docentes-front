import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocentesComponent } from './docentes/docentes.component';

const routes: Routes = [
  { path: 'docentes', component: DocentesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }