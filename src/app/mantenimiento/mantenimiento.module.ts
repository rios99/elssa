import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { CPreguntasComponent } from './c-preguntas/c-preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MantenimientoService } from './mantenimiento.service';
import { HttpClientModule } from '@angular/common/http';
import { CRespuestasPreguntaComponent } from './c-respuestas-pregunta/c-respuestas-pregunta.component';
import { CPreguntaPorRespuestaComponent } from './c-pregunta-por-respuesta/c-pregunta-por-respuesta.component';
import { CDatoRespuestaComponent } from './c-dato-respuesta/c-dato-respuesta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CDatoPregPorRespComponent } from './c-dato-preg-por-resp/c-dato-preg-por-resp.component';


@NgModule({
  declarations: [
    CPreguntasComponent,
    CRespuestasPreguntaComponent,
    CPreguntaPorRespuestaComponent,
    CDatoRespuestaComponent,
    CDatoPregPorRespComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers:[
    MantenimientoService
  ]

})
export class MantenimientoModule { }
