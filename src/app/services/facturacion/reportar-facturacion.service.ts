import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Facturacion } from '../../components/interfaces/facturacion';
import {catchError, retry, timeout} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportarFacturacionService {

  constructor( private http: HttpClient) { }
  private api = 'https://resatlon.herokuapp.com/apiFacturacion/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  getFacturasPorFecha(idAuth: string, fecha: string){
    const path = this.api + 'consultar/fecha?idAuth=' + idAuth + '&fechaConsultar=' + fecha;
    return this.http.get<Facturacion[]>(path).pipe(timeout(60000), retry(1), catchError(this.handleError));
  }
  getFacturasPorPrescripcion(idAuth: string, prescripcion: string){
    const path = this.api + 'consultar/prescripcion?idAuth=' + idAuth + '&prescripcion=' + prescripcion;
    return this.http.get<Facturacion[]>(path).pipe(timeout(60000), retry(1), catchError(this.handleError));
  }
  reportarFacturacion(idAuth: string, body: string){
    const path = this.api + 'reportar?idAuth=' + idAuth;
    return this.http.put<string>(path, body, {headers: this.headers}).pipe(catchError(this.handleError));
  }
  anularFacturacion(idAuth: string, idFacturacion: string){
    const path = this.api + 'anularMasivo?idAuth=' + idAuth;
    return this.http.put(path, idFacturacion, { headers: this.headers}).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if ( error.error.text == undefined ){
        errorMessage = 'Error conectandose al servidor';
      }else{
        errorMessage = error.error.text;
      }
    }
    return throwError(errorMessage);
  }
}
