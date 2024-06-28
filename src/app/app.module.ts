import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PagesService } from './pages/services/pages.service';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedModule } from './@core/shared/shared.module';
import { CmMensajeHomeComponent } from './modal/cm-mensaje-home/cm-mensaje-home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
//import {MatCardModule} from '@angular/material/card';
//import { MatDialogModule } from '@angular/material/dialog';
//import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TerminosCondicionesComponent,
    PreguntasFrecuentesComponent,
    CmMensajeHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
    //MatCardModule
  ],
  providers: [
    PagesService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
        
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    //MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
