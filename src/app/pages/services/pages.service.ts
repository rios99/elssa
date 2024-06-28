import { Injectable } from '@angular/core';
import { constantesApiWeb } from '../@models/apiVariables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I_empleador, I_grupos, I_inicioOperacion } from '../@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) {}

  listarGrupos(nombre:string, ruc:string) {
    const url = `${constantesApiWeb.grupos}?nombreCompleto=${nombre}&rucEmpleador=${ruc}`;
    return this.http.get<I_grupos>(url);
  }

  empleadores(ruc: number) {
    const url = `${constantesApiWeb.empleadores}/${ruc}`;    
    return this.http.get<I_empleador>(url);
  }

  iniciarOrientacion(objeto: any) {
    const url = `${constantesApiWeb.iniciarOrientacion}`;
    return this.http.post<I_inicioOperacion>(url, objeto);
  }

  obtenerPreguntaOpciones(objeto:any) {
    const url = `${constantesApiWeb.obtenerPreguntaOpciones}/${objeto.codigoOrientacion}/${objeto.codigoGrupo}/${objeto.codigoPregunta}/${objeto.codigoRespuesta}`;
    return this.http.get<any>(url);
  }

  obtenerFicha(codigoOrientacion:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/pdf',
    });

    const url = `${constantesApiWeb.obtenerFicha}/${codigoOrientacion}`;
    return this.http.get(url, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    })

  }

  retroceder(codigoOrientacion:any) {
    const url = `${constantesApiWeb.retroceder}/${codigoOrientacion}`;
    return this.http.get<any>(url);

  }

  getConformidad(codigoOrientacion:any, tipoConformidad:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/pdf',
    });

    const url = `${constantesApiWeb.obtenerFicha}/${codigoOrientacion}/${tipoConformidad}`;
    return this.http.get(url, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    })
  }

  eliminar(codigoOrientacion: any) {
    const url = `${constantesApiWeb.eliminar}/${codigoOrientacion}`;
    return this.http.delete<any>(url);
  }

  obtenerPreguntaFrecuentes() {
    const url = `${constantesApiWeb.obtenerPreguntaFrecuentes}`;
    return this.http.get<any>(url);
  }

  enviarEmail(email:string, codigoOrientacion:number) {
    const url = `${constantesApiWeb.enviarEmail}?coreoElectronico=${email}&codigoOrientacion=${codigoOrientacion}`;
    return this.http.get<any>(url);
  }
}
