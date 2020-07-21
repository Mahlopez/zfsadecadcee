import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navBarService/navbar.service';
import {ReportarFacturacionService} from "../../../services/facturacion/reportar-facturacion.service";

@Component({
  selector: 'app-facturacion-home',
  templateUrl: './facturacion-home.component.html',
  styles: [
  ]
})
export class FacturacionHomeComponent implements OnInit {

  constructor(public reportarFacturacionService : ReportarFacturacionService) { }

  ngOnInit(): void {
  }


}
