import { Component } from '@angular/core';
import {PortadaComponent } from '../../Shared/portada/portada.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-recomendaciones',
  imports: [PortadaComponent, NgForOf],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {

  protected readonly PortadaComponent = PortadaComponent;
}
