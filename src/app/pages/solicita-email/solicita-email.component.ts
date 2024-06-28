import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagesService } from '../services/pages.service';
import { constantesLocalStorage } from '../@models/constantes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicita-email',
  templateUrl: './solicita-email.component.html',
  styleUrls: ['./solicita-email.component.scss']
})
export class SolicitaEmailComponent implements OnInit, OnDestroy {
  $listSubcription: Subscription[] = [];
  //email: string = '';
  frmData!: FormGroup;
  procesoEnvio:boolean=false;

  constructor(    private fb: FormBuilder,private servicePages: PagesService, public dialogRef: MatDialogRef<SolicitaEmailComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createFrm();
    this.checkScreenSize()
  }

  ngOnDestroy() {
    if (this.$listSubcription != undefined) {
      this.$listSubcription.forEach((sub) => sub.unsubscribe());
    }
  }

  createFrm() {
    this.frmData = this.fb.group({
      email: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required,Validators.email]
      ],
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      // Aplicar el cambio de tamaño solo en versiones móviles
      this.dialogRef.updateSize('75%', '28%');
    }
  }
  enviar() {
    console.log("enviar", this.frmData.get("email")?.value);
    if (
      this.frmData.get("email")?.value == null ||
      this.frmData.get("email")?.value == ''
    ) {
      Swal.fire("Ingrese Email");
      return;
    } 
   if (!this.frmData.valid) {
     Swal.fire("el email es incorrecto");
     return
   }
   
    // if (!this.frmData.valid){
    //   Swal.fire('El email es incorrecto');
    //   return;
    // }

    this.procesoEnvio = true;
    const email:string=this.frmData.get('email')?.value
    const $enviarEmail = this.servicePages.enviarEmail(email, constantesLocalStorage.codigoOrientacion)
      .subscribe({
        next: (rpta: any) => {
          console.log("enviar mail : ", rpta);
          if (rpta.codigoRespuesta == "0"){
            Swal.fire("Estimado usuario, el correo fue enviado correctamente.");
          } else {
            Swal.fire("Ocurrió un error en el envió del correo por favor intente de nuevamente");
          }
          this.procesoEnvio = false;
          this.cerrar();
        },
        error: (err: any) => {
          this.procesoEnvio = false;
        },
        complete: () => { }
      });
    this.$listSubcription.push($enviarEmail)
  }

  cerrar(){
    this.dialogRef.close();

  }
}
