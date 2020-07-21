import { Component, OnInit } from '@angular/core';
import {ReportarFacturacionService} from "../../../services/facturacion/reportar-facturacion.service";
import {AuthService} from "../../../services/autenticacion/auth.service";
import {ExportarService} from "../../../services/exportar/exportar.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-facturacion-anular',
  templateUrl: './anular.component.html',
  styleUrls: [
  ]

})
export class FacturacionAnularComponent implements OnInit {

  constructor(private reportarFacturacionService:ReportarFacturacionService, public auth: AuthService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  private fileInput:FileList;
  private idAuth:string;

  subirArchivo(input: FileList, idAuth: string){
    this.fileInput=input;
    this.idAuth=idAuth;
  }
  procesarArchivo() {
    this.spinner.show();
    const file = this.fileInput.item(0);
    const reader = new FileReader();
    let body="";
    console.log('entro'+file);
    reader.onload = (event) => {
      const fileLocal = event.target.result;
      const allLines = (fileLocal as string).split(/\r\n|\n/);
      console.log('leyendo');
      allLines.map((line) => {
        console.log(line);
        body+=line+';';
      });
      this.reportarFacturacionService.anularFacturacion(this.idAuth.split("|")[1],body).subscribe(retornoServer => {
        console.log('anuló');
        this.spinner.hide();
      },error => {
        alert(error);
        this.spinner.hide();
      });

    };

    reader.readAsText(file);


  }

}
