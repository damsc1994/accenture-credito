export class Solicitud {
  constructor(
    public empresa: string,
    public nit: string,
    public salario: number,
    public fechaInicio: Date,
    public aprobada: boolean,
    public valorCredito: number
  ) {}
}
