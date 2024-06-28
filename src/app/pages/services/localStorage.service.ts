import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setearData(rpta:any) {
    localStorage.setItem('SUNAFIL_ORIENTACIONCOMITE', JSON.stringify(rpta));
  }

  obtenerDataGeneral(){
    const SOC:any = JSON.parse(localStorage.getItem('SUNAFIL_ORIENTACIONCOMITE')!);
    return SOC;
  }

  limpiar() {
    localStorage.removeItem('SUNAFIL_ORIENTACIONCOMITE');
  }
}