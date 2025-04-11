import { Component } from '@angular/core';
import {HeaderComponent} from '../Shared/header/header.component';
import {FooterComponent} from '../Shared/footer/footer.component';
import {RouterModule} from '@angular/router';
import {BuscadorComponent} from '../Shared/buscador/buscador.component';
import {AjustesComponent} from '../Shared/ajustes/ajustes.component';
import {PortadaComponent} from '../Shared/portada/portada.component';

@Component({
  selector: 'app-peliculas-series',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    BuscadorComponent,
    AjustesComponent,
    PortadaComponent,
  ],
  templateUrl: './peliculas-series.component.html',
  styleUrl: './peliculas-series.component.css'
})
export class PeliculasSeriesComponent {

}
