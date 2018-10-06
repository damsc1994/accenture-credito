import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SolicitudesServices } from '../../services/solicitudes.services';
import { ClienteServices } from '../../services/cliente.services';
import { Cliente } from '../../models/cliente';
import { Solicitud } from '../../models/solicitud';

@Component({
  selector: 'app-solicitar-credito',
  templateUrl: './solicitar-credito.component.html',
  providers: [SolicitudesServices, ClienteServices]
})
export class SolicitarCreditoComponent implements OnInit {
  public solicitudFG: FormGroup;
  public infoCliente: any;
  public solicitud: Solicitud;
  public status: any;
  public salarioMinimo: number;

  constructor(private _solicitudesService: SolicitudesServices, private  _clienteService: ClienteServices) {}

  ngOnInit(): void {
    this.solicitud = new Solicitud('', '', 0, null, false, 0);
    this.status = {result: null, message: null};

    this.salarioMinimo = 800000;
    this.solicitudFG = new FormGroup({
      empresa: new FormControl('', Validators.required),
      nit: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)]),
      salario: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)]),
      fechaInicio: new FormControl(new Date())
    });
  }


  onSubmit(): void {
    if (this.solicitudFG.valid) {
      this.solicitud = this.solicitudFG.value;
      const credito = this.getValorCredito(this.solicitud);
      if (credito) {
        this.solicitud.aprobada = credito.aprobado;
        this.solicitud.valorCredito = credito.valor;
        this._solicitudesService.addSolicitud(this.solicitud, this.infoCliente.token).subscribe(
          (response) => {
            const creditMessage = credito.valor > 0 ? `Su credito fue aprobado por un valor de ${credito.valor}` : `Su credito no fue aprobado por: ${credito.message}`;
            this.status = {result: credito.valor > 0 ? 'success' : 'warning', message: creditMessage};
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getValorCredito(solicitud: Solicitud) {
    const tiempo = this.getTiempoEnEmpresa(solicitud.fechaInicio);

    if (tiempo < 1) {
      return {result: 'warning', message: `No tienes mas de un año en la empresa ${solicitud.empresa}`, aprobado: false, valor: 0};
    }

    if (solicitud.salario <= this.salarioMinimo) {
      return {result: 'warning', message: `Para solicitar el credito tu salario debe ser mayor a 800000`, aprobado: false, valor: 0};
    }

    if (solicitud.salario > this.salarioMinimo && solicitud.salario < 1000000) {
      return {
        valor: 5000000,
        aprobado: true
      };
    }

    if (solicitud.salario > 1000000 && solicitud.salario < 4000000) {
      return {
        valor: 20000000,
        aprobado: true
      };
    }

    if (solicitud.salario >= 4000000) {
      return {
       valor: 50000000,
       aprobado: true
      };
    }
  }

  getTiempoEnEmpresa(fechaNacimiento): number {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate());
    fechaActual.setMonth(fechaActual.getMonth());
    fechaActual.setFullYear(fechaActual.getFullYear());
    return (((fechaActual.getTime() - fechaNac.getTime()) / (1000 * 60 * 60 * 24) / 365));
  }

  verificarCliente(event): void {
    this.infoCliente = null;
    if (event.identificacion.valid) {
      this._clienteService.getClienteToken(event.identificacion.value).subscribe(
        (response) => {
          if (response.status == 404) {
            
          } else {
            this.status = {result: null, message: null};
            this.infoCliente = response;
          }
        },
        (err) => {
          this.status = {result: 'danger', message: err.error.message};
          console.log(err);
        }
      );
    }
  }
}
