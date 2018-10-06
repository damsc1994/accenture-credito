import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteServices } from '../../services/cliente.services';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  providers: [ ClienteServices ]
})
export class RegistroClienteComponent implements OnInit {
  public clienteFG: FormGroup;
  public title: string;
  public cliente: Cliente;
  public status: any;

  constructor(private _clienteService: ClienteServices) {}

  ngOnInit(): void {
    this.title = 'Registro';

    this.status = {result: null, message: null};
    this.cliente = new Cliente('', '', '', null);
    this.clienteFG = new FormGroup({
      identificacion: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required)
    });
  }


  getEdad(fechaNacimiento): number {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate());
    fechaActual.setMonth(fechaActual.getMonth());
    fechaActual.setFullYear(fechaActual.getFullYear());
    const edad = Math.floor(((fechaActual.getTime() - fechaNac.getTime()) / (1000 * 60 * 60 * 24) / 365));
    return edad;
  }

  validarEdad(edad) {
    return (edad < 18 ? true: false)
  }

  onSubmit(){
    if (this.clienteFG.valid) {
      this.cliente = this.clienteFG.value;
      if (this.validarEdad(this.getEdad(this.cliente.fechaNacimiento))) {
        return this.status = {result: 'danger', message: `No cumples con la edad necesaria`};
      }
      this._clienteService.addCliente(this.cliente).subscribe(
        (response) => {
          if (response.savedCliente.created) {
            this.status = {result: 'success', message: `El cliente fue registrado correctamente`};
            this.clienteFG.reset();
          } else {
            this.status = {result: 'danger', message: `El cliente ${this.cliente.identificacion} ya existe en la base de datos`};
          }

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
