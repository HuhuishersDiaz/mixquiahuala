import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { AllComponent } from './routes/all/all.component';
import { PreviewComponent } from './routes/preview/preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AllComponent, PreviewComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ServiciosModule {}
