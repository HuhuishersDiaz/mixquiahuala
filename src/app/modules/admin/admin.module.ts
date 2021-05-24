import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ConvocatoriasComponent } from './routes/convocatorias/convocatorias.component';
import { GaleriaComponent } from './routes/galeria/galeria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SliderComponent } from './routes/slider/slider.component';
import { ServiciosComponent } from './routes/servicios/servicios.component';
import { TalleresComponent } from './routes/talleres/talleres.component';
import { UsuariosComponent } from './routes/usuarios/usuarios.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { RegistrosComponent } from './routes/registros/registros.component';
@NgModule({
  declarations: [
    AdminComponent,
    ConvocatoriasComponent,
    GaleriaComponent,
    SliderComponent,
    ServiciosComponent,
    TalleresComponent,
    UsuariosComponent,
    FileUploadComponent,
    RegistrosComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
  ],
})
export class AdminModule {}
