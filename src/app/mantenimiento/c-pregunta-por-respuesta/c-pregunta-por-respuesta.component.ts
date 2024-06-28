import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CDatoRespuestaComponent } from '../c-dato-respuesta/c-dato-respuesta.component';
import { MantenimientoService } from '../mantenimiento.service';
import { CDatoPregPorRespComponent } from '../c-dato-preg-por-resp/c-dato-preg-por-resp.component';

@Component({
  selector: 'app-c-pregunta-por-respuesta',
  templateUrl: './c-pregunta-por-respuesta.component.html',
  styleUrls: ['./c-pregunta-por-respuesta.component.scss']
})
export class CPreguntaPorRespuestaComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginatorPreg!: MatPaginator;
  //@ViewChild(MatPaginator) paginatorRpta!: MatPaginator;
  $listSubcription: Subscription[] = [];
  dataSourcePreguntas: any;
  displayedColumnsPreg: string[] = [
    'codigo',
    'descripcion',
    'opciones'
  ];
  dataSourceRpta: any;
  displayedColumnsRpta: string[] = [
    'codigoPregunta',
    'descripcion',
    'flagConformidad',
    'opciones'
  ];

  constructor(
    public dialog: MatDialog,
    private serviceMantenimiento: MantenimientoService
  ) { }

  ngOnInit(): void {
    this.getListarPreguntas();
    //this.getListarRespuestas();
  }

  ngOnDestroy() {
    if (this.$listSubcription != null) {
      this.$listSubcription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

  getListarPreguntas() {
    this.dataSourcePreguntas = [];
    const $listarPreguntas = this.serviceMantenimiento.listarPreguntas().subscribe({
      next: (rpta: any) => {
        this.dataSourcePreguntas = new MatTableDataSource(rpta);
        this.dataSourcePreguntas.paginator = this.paginatorPreg;
      },
      error: (err: any) => { },
      complete: () => { },
    });
    this.$listSubcription.push($listarPreguntas);
  }

  getListarRespuestas(codigoPregunta:number) {
    this.dataSourceRpta = [];
    const $listarPreguntas = this.serviceMantenimiento.listarRespuesta(codigoPregunta).subscribe({
      next: (rpta: any) => {
        this.dataSourceRpta = new MatTableDataSource(rpta);
        //this.dataSourceRpta.paginator = this.paginatorRpta;
      },
      error: (err: any) => { },
      complete: () => { },
    });
    this.$listSubcription.push($listarPreguntas);
  }

  /*addRespuesta(codigoPregunta:number){
    console.log("addRespuesta : ", codigoPregunta);
    const dialogRef = this.dialog.open(CDatoRespuestaComponent, {
      data: { codPregunta: codigoPregunta },
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListarRespuestas(codigoPregunta);
    });
  }*/

  verRespuestasPorPregunta(codigoPregunta:number){
    console.log("addRespuesta : ", codigoPregunta);
    this.getListarRespuestas(codigoPregunta)
  }

  addPreguntaxRespuesta(codigoPregunta:number, codigoRespuesta:number, descRespuesta:string){
    console.log("addRespuesta : ", codigoPregunta);
    const dialogRef = this.dialog.open(CDatoPregPorRespComponent, {
      data: { codPregunta: codigoPregunta, codRespuesta:codigoRespuesta, descRespuesta:descRespuesta },
      width: '1200px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListarRespuestas(codigoPregunta);
    });
  }
}
