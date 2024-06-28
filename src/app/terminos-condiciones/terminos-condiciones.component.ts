import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit{
  //@Output() ob_aceptarTerminos = new EventEmitter<boolean>();
  chkAceptar:boolean = false;

  constructor(private router:Router, private snackBar: MatSnackBar){ }

  ngOnInit(): void { } 

  aceptaTerminos(){
    /*if (!this.chkAceptar){
      this.snackBar.open("DEBE ACEPTAR LOS TÉRMINOS Y CONDICIONES", "Aviso",{duration: 1500});
      return;
    }
    //this.ob_aceptarTerminos.emit(true);
    this.router.navigate(['/orientacion/comitesst']);*/
  }

  siguiente(){
    this.router.navigate(['/orientacion/comitesst']);
  }
  
}
