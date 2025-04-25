import {Component, OnInit} from '@angular/core';
import { BuscadorComponent } from '../Shared/buscador/buscador.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { MasVistosComponent } from './mas-vistos/mas-vistos.component';
import { InstanciaBlogComponent } from './instancia-blog/instancia-blog.component';
import {RouterOutlet} from '@angular/router';
import {Blog, BlogService} from '../core/services/blog.service';

@Component({
  selector: 'app-main',
  imports: [BuscadorComponent, RecomendacionesComponent, MasVistosComponent,
    InstanciaBlogComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
