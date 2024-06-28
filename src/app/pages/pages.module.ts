import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { FormDinamicoComponent } from './components/form-dinamico/form-dinamico.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../@core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { PagesService } from './services/pages.service';
//import { HomeComponent } from '../home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SolicitaEmailComponent } from './solicita-email/solicita-email.component';
//import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';
/*import { MatCheckboxModule } from '@angular/material/checkbox';
import { PreguntasFrecuentesComponent } from '../preguntas-frecuentes/preguntas-frecuentes.component';*/
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { FinalizaOrientacionComponent } from './finaliza-orientacion/finaliza-orientacion.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

/*const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent, },
    { path: 'orientacioncomitesst',
    component: PagesComponent,
    children: [
      {
        path: 'orientacioncomitesst',
        component: FormDinamicoComponent
      }
    ]
  }
    // { path: 'orientacioncomitesst', redirectTo: '/orientacioncomitesst', pathMatch: 'prefix'},
    // { path: 'orientacioncomitesst', component: PagesComponent, }, 
    // { path: 'form-dinamico', redirectTo: '/form-dinamico', pathMatch: 'prefix'},
    // { path: 'form-dinamico', component: FormDinamicoComponent}
  ]*/


@NgModule({
    declarations: [
        FormDinamicoComponent,
        PagesComponent,
        SolicitaEmailComponent,
        FinalizaOrientacionComponent,
        //PreguntasFrecuentesComponent,
        //HomeComponent,
        //TerminosCondicionesComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatButtonModule,
        //RouterModule.forChild(routes),
        FlexLayoutModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        SweetAlert2Module,
        //MatCheckboxModule
        MatDialogModule
    ],
    providers:[
      MatDialog,
      //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
        PagesService
    ]
})
export class PagesModule { }
