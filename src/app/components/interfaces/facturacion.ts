export interface Facturacion {
  ID:number;
  IDFacturacion:number;
  NoPrescripcion:string;
  TipoTec:string;
  ConTec:number;
  TipoIDPaciente:string;
  NoIDPaciente:string;
  NoEntrega:number;
  NoFactura:string;
  NoIDEPS:string;
  CodEPS:string;
  CodSerTecAEntregado:string;
  CantUnMinDis:number;
  ValorUnitFacturado:number;
  ValorTotFacturado:number;
  CuotaModer:number;
  Copago:number;
  FecFacturacion:string;
  EstFacturacion:number;
  FecAnulacion:string;
}
