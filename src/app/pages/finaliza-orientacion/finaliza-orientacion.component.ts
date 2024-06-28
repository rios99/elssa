import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finaliza-orientacion',
  templateUrl: './finaliza-orientacion.component.html',
  styleUrls: ['./finaliza-orientacion.component.scss']
})
export class FinalizaOrientacionComponent implements OnInit {
  email: string = '';

  constructor(private router: Router, public dialogRef: MatDialogRef<FinalizaOrientacionComponent>) { }

  ngOnInit(): void {

  }


  cerrar(){
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }
}
