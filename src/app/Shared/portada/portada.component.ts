import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Serie} from '../../core/services/series.service';
import {Actor} from '../../core/services/actores.service';

@Component({
  selector: 'app-portada',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {
  @Input() item: Serie | Actor | null = null;
  @Input() serie: any;
  isSerie(item: Serie | Actor | null): item is Serie {
    return (item as Serie)?.portada !== undefined;
  }

  // Type guard para verificar si es un Actor
  isActor(item: Serie | Actor | null): item is Actor {
    return (item as Actor)?.foto !== undefined;
  }
}
