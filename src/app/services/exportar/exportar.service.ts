import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.sreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT= '.xlsx'
@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  constructor() { }

  exportarAExcel(json: any[],nombreArchivo:string){
    const workSheet : XLSX.WorkSheet=XLSX.utils.json_to_sheet(json);
    const workBook : XLSX.WorkBook = {
      Sheets :{ 'data': workSheet },
      SheetNames : ['data']
    };
    const excelBuffer:any=XLSX.write(workBook,{bookType:'xlsx',type:'array'});
    this.guardarExcel(excelBuffer,nombreArchivo);
  }

  private guardarExcel(buffer : any,fileName:string){
    const data : Blob = new Blob([buffer], { type : EXCEL_TYPE});
    FileSaver.saveAs(data, fileName+'_export'+EXCEL_EXT);
  }

}
