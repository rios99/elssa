import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MantenimientoService } from '../mantenimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CDatoRespuestaComponent } from '../c-dato-respuesta/c-dato-respuesta.component';

@Component({
  selector: 'app-c-respuestas-pregunta',
  templateUrl: './c-respuestas-pregunta.component.html',
  styleUrls: ['./c-respuestas-pregunta.component.scss']
})
export class CRespuestasPreguntaComponent implements OnInit, OnDestroy {
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
    'flagConformidad'
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

  addRespuesta(codigoPregunta:number){
    console.log("addRespuesta : ", codigoPregunta);
    const dialogRef = this.dialog.open(CDatoRespuestaComponent, {
      data: { codPregunta: codigoPregunta },
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListarRespuestas(codigoPregunta);
    });
  }

  verRespuestasPorPregunta(codigoPregunta:number){
    console.log("addRespuesta : ", codigoPregunta);
    this.getListarRespuestas(codigoPregunta)
  }
}
