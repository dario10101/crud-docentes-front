import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DocenteService } from './docentes/docente.service';
import { DocentesComponent } from './docentes/docentes.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './docentes/docente/form.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DocentesComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DocenteService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  // const routes: Routes = [
  //   {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  //   {path: 'directivas', component: DirectivaComponent},
  //   {path: 'clientes', component: ClientesComponent}
  // ];

}
