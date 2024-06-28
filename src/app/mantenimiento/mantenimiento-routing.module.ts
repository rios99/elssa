import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CPreguntasComponent } from './c-preguntas/c-preguntas.component';
import { CRespuestasPreguntaComponent } from './c-respuestas-pregunta/c-respuestas-pregunta.component';
import { CPreguntaPorRespuestaComponent } from './c-pregunta-por-respuesta/c-pregunta-por-respuesta.component';

const routes: Routes = [
  {
    path:'preguntas',
    component: CPreguntasComponent
  },
  {
    path:'respuesta',
    component: CRespuestasPreguntaComponent
  },
  {
    path:'preguntaxrespuesta',
    component: CPreguntaPorRespuestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
