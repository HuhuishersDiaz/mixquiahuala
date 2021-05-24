import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { AdminComponent } from './admin.component';
import { ConvocatoriasComponent } from './routes/convocatorias/convocatorias.component';
import { GaleriaComponent } from './routes/galeria/galeria.component';
import { RegistrosComponent } from './routes/registros/registros.component';
import { ServiciosComponent } from './routes/servicios/servicios.component';
import { SliderComponent } from './routes/slider/slider.component';
import { TalleresComponent } from './routes/talleres/talleres.component';
import { UsuariosComponent } from './routes/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'convocatorias',
        component: ConvocatoriasComponent,
      },
      {
        path: 'galeria',
        component: GaleriaComponent,
      },
      {
        path: 'slider',
        component: SliderComponent,
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
      },
      {
        path: 'talleres',
        component: TalleresComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'registros',
        component: RegistrosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
