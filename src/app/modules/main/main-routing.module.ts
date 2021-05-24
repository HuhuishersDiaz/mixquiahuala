import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ConvocatoriasComponent } from './routes/convocatorias/convocatorias.component';
import { EntrevistasComponent } from './routes/entrevistas/entrevistas.component';
import { GaleriaComponent } from './routes/galeria/galeria.component';
import { HomeComponent } from './routes/home/home.component';
import { ServiciosComponent } from './routes/servicios/servicios.component';
import { TalleresComponent } from './routes/talleres/talleres.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path: 'convocatorias',
        component: ConvocatoriasComponent,
      },
      {
        path: 'talleres',
        component: TalleresComponent,
      },
      {
        path: 'entrevistas',
        component: EntrevistasComponent,
      },
      {
        path: 'galeria',
        component: GaleriaComponent,
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./routes/servicios/servicios.module').then(
            (m) => m.ServiciosModule
          ),
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
