import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { PagesComponent } from './pages.component';
import { FormDinamicoComponent } from './components/form-dinamico/form-dinamico.component';*/
//import { HomeComponent } from '../home/home.component';
import { PagesComponent } from './pages.component';
import { FormDinamicoComponent } from './components/form-dinamico/form-dinamico.component';

/*const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: '',
    component: PagesComponent,
    children: [
      {
        path: 'orientacioncomitesst',
        component: FormDinamicoComponent
      }
    ]
  }  
];*/

const routes: Routes = [
  { path: 'comitesst',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: FormDinamicoComponent
      },

    ]
  }
  /*{ path: '', redirectTo: '/comitesst', pathMatch: 'full' },
  { path: 'comitesst', component: HomeComponent },*/
  /*{ path: '',
    component: PagesComponent,
    children: [
      {
        path: 'comitesst',
        component: HomeComponent
      }
    ]
  }*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
