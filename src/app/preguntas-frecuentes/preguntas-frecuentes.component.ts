import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagesService } from '../pages/services/pages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class PreguntasFrecuentesComponent implements OnInit, OnDestroy{
  $listSubcription: Subscription[] = [];
  panelOpenState = false;
  preguntas:any[]=[];
  
  constructor(private servicePages:PagesService){
  }

  ngOnInit(): void {
    this.preguntasFrecuentes();
  }

  ngOnDestroy() {
    if (this.$listSubcription != undefined) {
      this.$listSubcription.forEach((sub) => sub.unsubscribe());
    }
  }
  
  preguntasFrecuentes(){
    const $obtenerPreguntaFrecuentes = this.servicePages.obtenerPreguntaFrecuentes()
      .subscribe({
        next: (rpta: any) => {
          console.log("preguntas : ", rpta);
          this.preguntas = rpta;
          
        },
        error: (err: any) => {
        },
        complete: () => { }
      });
    this.$listSubcription.push($obtenerPreguntaFrecuentes)
  }

}
