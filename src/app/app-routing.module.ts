import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocentesComponent } from './docentes/docentes.component';
import { FormComponent } from './docentes/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/docentes', pathMatch: 'full' },
  { path: 'docentes', component: DocentesComponent },
  { path: 'docentes/form', component: FormComponent },
  { path: 'docentes/form/:id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }