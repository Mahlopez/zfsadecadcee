import { Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/autenticacion/auth.service";
import {ReportarFacturacionService} from "../../../services/facturacion/reportar-facturacion.service";
import {NgxSpinnerService} from "ngx-spinner";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styles: [
  ]
})
export class FacturacionReportarComponent implements OnInit {
  constructor( private reportarFacturacionService:ReportarFacturacionService, public auth: AuthService,private spinner:NgxSpinnerService) { }
  private fileInput:FileList;
  private idAuth:string;

  subirArchivo(input: FileList, idAuth: string){
    this.fileInput=input;
    this.idAuth=idAuth;
  }

  procesarArchivo(){
    this.spinner.show();
    let body: string;
    body = "[";
    const file = this.fileInput.item(0);
    const reader = new FileReader();
    let retorno:string;
    reader.onload = (event) => {
          const fileLocal = event.target.result;
          const allLines = (fileLocal as string).split(/\r\n|\n/);
          let count=0;
          allLines.map((line) => {
            count ++;
              if (this.validarLinea(line)){
                body = body + this.crearObjFactura(line);
              }else{
                this.spinner.hide();
                alert('Error en el formato del archivo en la linea: '+count);
                throw error("Error en el formato del archivo");
              }
            body = body +','
          });
      body=body.substr(0,body.length-1)+"]";
      console.log(body);
      this.reportarFacturacionService.reportarFacturacion(this.idAuth.split("|")[1],body).subscribe(retornoServer=>{
        retorno = retornoServer;
        if(retorno=='1'){
          alert('El archivo se cargó con exito');
        }else{
          alert('El archivo no se pudo cargar por error: '+retorno);
        }

      },error => {
        alert(error);
        this.spinner.hide();
      });
      this.spinner.hide();
    };



    reader.onerror = (evt) => {
          alert(evt.target.error.name);
      };

    reader.readAsText(file);

  }

  crearObjFactura(linea: string): string{
      let obj: string;
      const objFacturacion = linea.split(',');

      obj = '{"NoPrescripcion":"' + objFacturacion[0] + '",'
            + '"TipoTec":"' + objFacturacion[1] + '",'
            + '"ConTec":' + objFacturacion[2] + ','
            + '"TipoIDPaciente":"' + objFacturacion[3] + '",'
            + '"NoIDPaciente":"' + objFacturacion[4] + '",'
            + '"NoEntrega":' + objFacturacion[5] + ','
            + '"NoFactura":"' + objFacturacion[6] + '",'
            + '"NoIDEPS":"' + objFacturacion[7] + '",'
            + '"CodEPS":"' + objFacturacion[8] + '",'
            + '"CodSerTecAEntregado":"' + objFacturacion[9] + '",'
            + '"CantUnMinDis":"' + objFacturacion[10] + '",'
            + '"ValorUnitFacturado":"' + objFacturacion[11] + '",'
            + '"ValorTotFacturado":"' + objFacturacion[12] + '",'
            + '"CuotaModer":"' + objFacturacion[13] + '",'
            + '"Copago":"' + objFacturacion[14] + '"}';

    return obj;
  }
  validarLinea(linea: string): boolean{

    const objFacturacion = linea.split(',');
    if ( objFacturacion.length === 15 && this.estructuraCorrecta(objFacturacion)){
      return true;
    }
    return false;
  }

  estructuraCorrecta(objFacturacion: string[]): boolean{

      if (
      this.esNumero(objFacturacion[0]) &&
      this.esCadena(objFacturacion[1]) &&
      this.esNumero(objFacturacion[2]) &&
      this.esCadena(objFacturacion[3]) &&
      this.esNumero(objFacturacion[4]) &&
      this.esNumero(objFacturacion[5]) &&
      this.esMixto(objFacturacion[6]) &&
      this.esNumero(objFacturacion[7]) &&
      this.esMixto(objFacturacion[8]) &&
      this.esMixtoRaya(objFacturacion[9]) &&
      this.esNumero(objFacturacion[10]) &&
      this.esNumero(objFacturacion[11]) &&
      this.esNumero(objFacturacion[12]) &&
      this.esNumero(objFacturacion[13]) &&
      this.esNumero(objFacturacion[14])
    ){
        console.log('es valido');
      return true;
    }else{
        console.log('no es valido');
      return false;
    }
  }

  esMixto(linea: string): boolean{
    const expreg =/[A-Za-z0-9]$/;
    if (expreg.test(linea)){
      return true;
    }else{
      console.log(linea);
      return false;
    }
  }

  esCadena(linea: string): boolean{
    const expreg =new RegExp(/[A-Za-z]+/,"g");
    if (expreg.test(linea)){
      return true;
    }else{
      console.log(linea);
      return false;
    }
  }

  esNumero(linea: string): boolean{
    const expreg =new RegExp(/[0-9]+/,"g");
    if (expreg.test(linea)){
      return true;
    }else{
      console.log(linea);
      return false;
    }
  }

  esMixtoRaya(linea: string): boolean{
    const expreg = /^[a-zA-Z0-9\-]*/;
    if (expreg.test(linea)){
      console.log(linea);
      return true;
    }else{
      console.log(linea);
      return false;
    }
  }

  ngOnInit(): void {
  }
}
