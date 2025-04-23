import {PortadaComponent} from '../portada/portada.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANTE

@Component({
  selector: 'app-carrusel',
  imports: [PortadaComponent,CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
  @Input() series: any[] = [];
}
