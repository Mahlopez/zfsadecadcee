import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/compartido/navbar/navbar.component';
import { NavbarInternoComponent } from './components/compartido/navbar-interno/navbar-interno.component';

import { FacturacionConsultarComponent } from './components/facturacion/consultar/consultar.component';
import { FacturacionReportarComponent } from './components/facturacion/reportar/reportar.component';
import { FacturacionHomeComponent } from './components/facturacion/facturacion-home/facturacion-home.component';

import { DireccionaminetoHomeComponent } from './components/direccionamiento/direccionamineto-home/direccionamineto-home.component';
import { DireccionamientoConsultarComponent } from './components/direccionamiento/consultar/consultar.component';
import { DireccionamientoReportarComponent } from './components/direccionamiento/reportar/reportar.component';

import { EntregaHomeComponent } from './components/entrega/entrega-home/entrega-home.component';
import { EntregaConsultarComponent } from './components/entrega/consultar/consultar.component';
import { EntregaReportarComponent } from './components/entrega/reportar/reportar.component';

import { ReportarEntregaHomeComponent } from './components/reportar-entrega/reportar-entrega-home/reportar-entrega-home.component';
import { ReportarEntregaConsultarComponent } from './components/reportar-entrega/consultar/consultar.component';
import { ReportarEntregaReportarComponent } from './components/reportar-entrega/reportar/reportar.component';
import { FacturacionAnularComponent } from './components/facturacion/anular/anular.component';
import { AnularComponent } from './components/direccionamiento/anular/anular.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DireccionamientoConsultarComponent,
    DireccionamientoReportarComponent,
    EntregaConsultarComponent,
    EntregaReportarComponent,
    FacturacionConsultarComponent,
    FacturacionReportarComponent,
    ReportarEntregaConsultarComponent,
    ReportarEntregaReportarComponent,
    NavbarComponent,
    NavbarInternoComponent,
    FacturacionHomeComponent,
    DireccionaminetoHomeComponent,
    EntregaHomeComponent,
    ReportarEntregaHomeComponent,
    FacturacionAnularComponent,
    AnularComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
