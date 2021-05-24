import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { MainComponent } from './main.component';
import { HomeComponent } from './routes/home/home.component';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ConvocatoriasComponent } from './routes/convocatorias/convocatorias.component';
import { TalleresComponent } from './routes/talleres/talleres.component';
import { GaleriaComponent } from './routes/galeria/galeria.component';
import { EntrevistasComponent } from './routes/entrevistas/entrevistas.component';
import { ServiciosComponent } from './routes/servicios/servicios.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ConvocatoriasComponent,
    TalleresComponent,
    EntrevistasComponent,
    GaleriaComponent,
    ServiciosComponent,
  ],
  imports: [CommonModule, MainRoutingModule, NgxEditorModule],
})
export class MainModule {}
