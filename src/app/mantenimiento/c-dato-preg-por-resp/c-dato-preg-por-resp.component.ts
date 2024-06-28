import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MantenimientoService } from '../mantenimiento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-c-dato-preg-por-resp',
  templateUrl: './c-dato-preg-por-resp.component.html',
  styleUrls: ['./c-dato-preg-por-resp.component.scss']
})
export class CDatoPregPorRespComponent implements OnInit, OnDestroy  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  $listSubcription: Subscription[] = [];
  frmData!: FormGroup;
  listaPreguntas:any[]=[];
  dataSource: any;
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'opciones'    
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceMantenimiento: MantenimientoService,
    @Inject(MAT_DIALOG_DATA) public data: {codPregunta: number, codRespuesta:number, descRespuesta:string}
  ) { }

  ngOnInit(): void {
    this.createFrm();
    this.getPreguntas();
  }

  ngOnDestroy() {
    if (this.$listSubcription != null) {
      this.$listSubcription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

  createFrm() {
    this.frmData = this.fb.group({
      codigoPregunta: [{ value: this.data.codPregunta, disabled: true }],
      codigoRespuesta: [{ value: this.data.codRespuesta, disabled: true }],
      codigoPreguntaRedirecion:[{ value: 0, disabled: false }],
      finOrientacion: [{ value: 'N', disabled: false }],
      descRespuesta: [{ value: this.data.descRespuesta, disabled: true }]
    });
  }

  getPreguntas() {
    const $listarPreguntas = this.serviceMantenimiento.listarPreguntas().subscribe({
      next: (rpta: any) => {
        //this.listaPreguntas = rpta
        this.dataSource = new MatTableDataSource(rpta);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => { },
      complete: () => { },
    });
    this.$listSubcription.push($listarPreguntas);
  }

  guardar() {
    this.snackBar.dismiss();

    const $guardarPreguntasPorRespuesta = this.serviceMantenimiento
      .guardarPreguntasPorRespuesta(this.frmData.getRawValue())
      .subscribe({
        next: (rpta: any) => {
          this.limpiarControles();
          this.snackBar.open('Aviso', "Se grabo", { duration: 3000 });
        },
        error: (err: any) => {
          this.snackBar.open('Error', 'Lo sentimos ocurrió un error', { duration: 3000 });
        },
        complete: () => { },
      });
    this.$listSubcription.push($guardarPreguntasPorRespuesta);
  }

  limpiarControles() {
    this.frmData.reset({
      codigoPregunta: this.data.codPregunta,
      codigoRespuesta:this.data.codRespuesta,
      codigoPreguntaRedirecion: 0,
      descRespuesta: this.data.descRespuesta,
      finOrientacion: 'N',
    });
  }

  agregarNvaPregunta(codigo:number){
    this.frmData.get('codigoPreguntaRedirecion')?.setValue(codigo)
  }
}
