import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CmMensajeHomeComponent } from '../modal/cm-mensaje-home/cm-mensaje-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  visibleTC: boolean = true;
  visibleHome: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {
    this.mostrarModal();
  }

  getAceptarTC(valor:boolean){
    this.visibleTC = false;
    this.visibleHome = true;
  }

  ingresar() {
    //this.router.navigate(['/orientacion/comitesst']);
    this.router.navigate(['/termino-condiciones']);
  }

  mostrarModal(){
    const dialogRef = this.dialog.open(CmMensajeHomeComponent, {
      data: { },
      //width: '1200px',
      width: '32%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
