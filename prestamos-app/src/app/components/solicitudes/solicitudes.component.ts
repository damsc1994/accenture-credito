import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SolicitudesServices } from '../../services/solicitudes.services';

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    providers: [ SolicitudesServices ]
})
export class SolicitudesComponent implements OnInit {
    public titulo: String;
    public solicitudes: any[];
    public status: any;

    constructor(private _solicitudesServices: SolicitudesServices) {
        this.titulo = 'Ver mis Solicitudes de credito';
    }

    ngOnInit(): void {
        this.status = {result: null, message: null};
    }

    listarSolicitudes(event) {
        this.solicitudes = [];
        this._solicitudesServices.getSolicitudes(event.identificacion.value).subscribe(
            (response) => {
               this.solicitudes = response.solicitudes;
               if (this.solicitudes.length > 0) {
                this.status = {result: 'success', message: 'resultado exitoso'};
               } else {
                this.status = {result: 'warning', message: `El cliente ${event.identificacion.value} no tiene solicitudes`};
               }
            },
            (err) => {
                this.status = {result: 'error', message: err.error.message};
                console.log(err);
            }
        );
    }

    getOptionDate(date): string {
        const dateAux = Date.parse(date);
        if (dateAux) {
            return new Intl.DateTimeFormat('en-US').format(dateAux);
        }
        console.log("No se ha podido obetner la fecha")
        return "";
    }

}
