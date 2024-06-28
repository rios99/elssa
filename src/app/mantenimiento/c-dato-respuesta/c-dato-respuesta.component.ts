import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MantenimientoService } from '../mantenimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-c-dato-respuesta',
  templateUrl: './c-dato-respuesta.component.html',
  styleUrls: ['./c-dato-respuesta.component.scss']
})
export class CDatoRespuestaComponent implements OnInit, OnDestroy  {
  $listSubcription: Subscription[] = [];
  frmData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceMantenimiento: MantenimientoService,
    @Inject(MAT_DIALOG_DATA) public data: {codPregunta: number}
  ) { }

  ngOnInit(): void {
    this.createFrm();
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
      descripcion: [{ value: '', disabled: false }],
      flagConformidad: [{ value: 'S', disabled: false },]
    });
  }

  guardar() {
    this.snackBar.dismiss();

    const $guardarRespuesta = this.serviceMantenimiento
      .guardarRespuesta(this.frmData.getRawValue())
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
    this.$listSubcription.push($guardarRespuesta);
  }

  limpiarControles() {
    this.frmData.reset({
      codigoPregunta: this.data.codPregunta,
      descripcion: '',
      flagConformidad: 'S',
    });
  }
}
