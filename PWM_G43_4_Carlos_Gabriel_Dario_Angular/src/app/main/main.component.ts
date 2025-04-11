import { Component } from '@angular/core';
import { HeaderComponent } from '../Shared/header/header.component';
import { BuscadorComponent } from '../Shared/buscador/buscador.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { MasVistosComponent } from './mas-vistos/mas-vistos.component';
import { InstanciaBlogComponent } from './instancia-blog/instancia-blog.component';
import {FooterComponent} from '../Shared/footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, BuscadorComponent, RecomendacionesComponent, MasVistosComponent,
    InstanciaBlogComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
