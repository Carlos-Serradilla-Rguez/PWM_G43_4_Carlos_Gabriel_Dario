import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Serie} from '../../core/services/series.service';
import {Actor} from '../../core/services/actores.service';

@Component({
  selector: 'app-portada',
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {
  @Input() item: Serie | Actor | null = null;
  @Input() serie: any;
  @Output() hijoSeleccionado = new EventEmitter<string | void>();

  constructor(private router: Router) {}

  isSerie(item: Serie | Actor | null): item is Serie {
    return (item as Serie)?.portada !== undefined;
  }

  // Type guard para verificar si es un Actor
  isActor(item: Serie | Actor | null): item is Actor {
    return (item as Actor)?.foto !== undefined;
  }

  onClick(id: string | void): void{
    console.log("Si que entra id:", id);
    this.hijoSeleccionado.emit(id);
    this.router.navigate(['/descripcion-pelicula', id]);
  }
}
