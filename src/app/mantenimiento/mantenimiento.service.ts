import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constantesApiWeb } from '../pages/@models/apiVariables';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http: HttpClient) {}

  listarPreguntas() {
    const url = `${constantesApiWeb.listarPreguntas}`;
    return this.http.get<any>(url);
  }

  guardarPreguntas(objeto: any) {
    const url = `${constantesApiWeb.guardarPreguntas}`;
    return this.http.post<any>(url, objeto);
  }

  listarRespuesta(codigoPregunta:number) {
    const url = `${constantesApiWeb.listarRespuesta}/${codigoPregunta}`;
    return this.http.get<any>(url);
  }

  guardarRespuesta(objeto: any) {
    const url = `${constantesApiWeb.guardarRespuesta}`;
    return this.http.post<any>(url, objeto);
  }

  listarPreguntasPorRespuesta() {
    const url = `${constantesApiWeb.listarPreguntasPorRespuesta}`;
    return this.http.get<any>(url);
  }

  guardarPreguntasPorRespuesta(objeto: any) {
    const url = `${constantesApiWeb.guardarPreguntasPorRespuesta}`;
    return this.http.post<any>(url, objeto);
  }
}
