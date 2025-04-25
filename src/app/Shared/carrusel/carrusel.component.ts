import {PortadaComponent} from '../portada/portada.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANTE

@Component({
  selector: 'app-carrusel',
  imports: [PortadaComponent,CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
  @Input() series: any[] = [];
  @Output() seleccionarId = new EventEmitter<string>();

  reenviarId(id: string | void) {
    this.seleccionarId.emit(id ?? "1");
  }
}
