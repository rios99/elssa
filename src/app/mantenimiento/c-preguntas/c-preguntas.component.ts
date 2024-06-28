import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MantenimientoService } from '../mantenimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c-preguntas',
  templateUrl: './c-preguntas.component.html',
  styleUrls: ['./c-preguntas.component.scss']
})
export class CPreguntasComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  $listSubcription: Subscription[] = [];
  frmData!: FormGroup;
  dataSource: any;
  displayedColumns: string[] = [
    'codigo',
    'codigoGrupo',
    'descripcion',
    'flagActivo',
    'urlDescarga1',
    'urlDescarga2'    
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceMantenimiento: MantenimientoService
  ) { }

  ngOnInit(): void {
    this.createFrm();
    this.getBuscar();
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
      codigo: [{ value: '', disabled: true }],
      descripcion: [{ value: '', disabled: false }],
      urlDescarga1: [{ value: '', disabled: false }],
      codigoGrupo: [{ value: 1, disabled: true }],
      urlDescarga2: [{ value: '', disabled: false },]
    });
  }

  getBuscar() {
    this.dataSource = [];
    const $listarPreguntas = this.serviceMantenimiento.listarPreguntas().subscribe({
      next: (rpta: any) => {
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

    const $guardarUsuario = this.serviceMantenimiento
      .guardarPreguntas(this.frmData.getRawValue())
      .subscribe({
        next: (rpta: any) => {
          this.limpiarControles();
          this.snackBar.open('Aviso', "Se grabo", { duration: 3000 });
          this.getBuscar();  
        },
        error: (err: any) => {
          this.snackBar.open('Error', 'Lo sentimos ocurrió un error', { duration: 3000 });
        },
        complete: () => { },
      });
    this.$listSubcription.push($guardarUsuario);
  }

  limpiarControles() {
    this.frmData.reset({
      codigo: '',
      descripcion: '',
      urlDescarga1: '',
      codigoGrupo: 1,
      urlDescarga2: '',
    });
    this.dataSource = [];
  }
}