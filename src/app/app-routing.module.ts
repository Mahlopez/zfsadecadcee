import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturacionHomeComponent } from './components/facturacion/facturacion-home/facturacion-home.component';
import { FacturacionConsultarComponent } from './components/facturacion/consultar/consultar.component';
import { FacturacionReportarComponent } from "./components/facturacion/reportar/reportar.component";
import { FacturacionAnularComponent } from "./components/facturacion/anular/anular.component";
import { GuardGuard } from './services/authGuard/guard.guard';
import { EntregaHomeComponent } from './components/entrega/entrega-home/entrega-home.component';
import { DireccionaminetoHomeComponent } from './components/direccionamiento/direccionamineto-home/direccionamineto-home.component';


const routes: Routes = [
  { path: 'facturacionHome', component: FacturacionHomeComponent, canActivate: [GuardGuard] },
  { path: 'entregaHome', component: EntregaHomeComponent, canActivate: [GuardGuard] },
  { path: 'direccionamientoHome', component: DireccionaminetoHomeComponent, canActivate: [GuardGuard] },
  { path: 'facturacionConsultar', component: FacturacionConsultarComponent, canActivate: [GuardGuard] },
  { path: 'facturacionReportar', component: FacturacionReportarComponent, canActivate: [GuardGuard] },
  { path: 'facturacionAnular', component: FacturacionAnularComponent, canActivate:[GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
