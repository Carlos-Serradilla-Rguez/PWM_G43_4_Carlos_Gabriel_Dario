import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from '../../Shared/portada/portada.component';
import { SeriesService } from '../../core/services/series.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [CommonModule, PortadaComponent, RouterLink],
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  series: any[] = [];
  private seriesService = inject(SeriesService);

  async ngOnInit() {
    this.series = await this.seriesService.getRandomSeries(3);
  }
}
