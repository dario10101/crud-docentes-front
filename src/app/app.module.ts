import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DocenteService } from './docentes/docente.service';
import { DocentesComponent } from './docentes/docentes.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './docentes/form.component';

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
    AppRoutingModule,
    FormsModule
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
