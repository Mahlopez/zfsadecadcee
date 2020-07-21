import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ReportarFacturacionService } from "../../../services/facturacion/reportar-facturacion.service";
import { Facturacion } from "../../interfaces/facturacion";
import { AuthService } from "../../../services/autenticacion/auth.service";
import { ExportarService } from "../../../services/exportar/exportar.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class FacturacionConsultarComponent implements OnInit {

  constructor( private reportarFacturacionService:ReportarFacturacionService, public auth: AuthService, private exportarService:ExportarService,private spinner:NgxSpinnerService) {
   }
  public listaFacturas:Array<Facturacion>;
  @ViewChild('valorFecha', {static: true}) valorFecha: ElementRef;
  @ViewChild('valorPrescripcion', {static: true}) valorPrescripcion: ElementRef;
  ngOnInit(): void {

  }
  private fileInput:FileList;
  private idAuth:string;
  isShown: boolean = false ;

  subirArchivo(input: FileList, idAuth: string){
    this.fileInput=input;
    this.idAuth=idAuth;
  }

  procesarArchivo() {
    this.spinner.show();
    const file = this.fileInput.item(0);
    const reader = new FileReader();
    console.log('entro' + file);
    reader.onload = (event) => {
      const fileLocal = event.target.result;
      const allLines = (fileLocal as string).split(/\r\n|\n/);
      console.log('leyendo');
      allLines.map((line) => {
        console.log(line);
        this.reportarFacturacionService.anularFacturacion(this.idAuth.split("|")[1], line).subscribe(retornoServer => {

        },error => {
          alert(error);
          this.spinner.hide();
        });
      });
      this.spinner.hide();
    };
    reader.readAsText(file);
  }

  getFacturasPorFecha(idAuth:string){
    this.spinner.show();
    let fecha =this.valorFecha.nativeElement.value;
    this.reportarFacturacionService.getFacturasPorFecha(idAuth.split("|")[1],fecha).subscribe(facturas=>{
      this.exportarService.exportarAExcel(facturas,'facturacion_'+fecha);
      this.spinner.hide();
    },error => {
      alert(error);
      this.spinner.hide();
    });
  }
  getFacturasPorPrescripcion(idAuth:string){
    this.spinner.show();
    this.reportarFacturacionService.getFacturasPorPrescripcion(idAuth.split("|")[1],this.valorPrescripcion.nativeElement.value).subscribe(facturas=>{
      this.isShown = true;
      this.listaFacturas=facturas;
      this.spinner.hide();
    },error => {
      alert(error);
      this.spinner.hide();
    });

  }

  ocultarDiv(){
    this.isShown = false;
  }



}
