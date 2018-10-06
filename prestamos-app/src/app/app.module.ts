import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/inicio/inicio.component'
import { RoutingApp } from './app.routing';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SolicitarCreditoComponent } from './components/solicitar-perstamo/solicitar-credito.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { IdentificacionComponent } from './components/emitters/idetificacion.component';

 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroClienteComponent,
    SolicitarCreditoComponent,
    SolicitudesComponent,
    IdentificacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingApp,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
