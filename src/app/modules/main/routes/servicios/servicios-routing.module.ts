import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './routes/all/all.component';
import { PreviewComponent } from './routes/preview/preview.component';
import { ServiciosComponent } from './servicios.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      {
        path: 'all',
        component: AllComponent,
      },
      {
        path: 'ver/:serviceID',
        component: PreviewComponent,
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
