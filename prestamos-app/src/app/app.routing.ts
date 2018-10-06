import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/inicio/inicio.component';
import { SolicitarCreditoComponent } from './components/solicitar-perstamo/solicitar-credito.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'solicitar-credito', component: SolicitarCreditoComponent},
    {path: 'solicitudes', component: SolicitudesComponent},
    {path: 'registo-cliente', component: RegistroClienteComponent},
    {path: '**', component: HomeComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingApp {}
