import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WhiteFullHeightWrapperComponent } from './wrappers/white-full-height-wrapper/white-full-height-wrapper.component';
import { DefaultWrapperComponent } from './wrappers/default-wrapper/default-wrapper.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MainLayoutComponent,
    WhiteFullHeightWrapperComponent,
    DefaultWrapperComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MainLayoutComponent
  ]
})
export class SharedModule { }
