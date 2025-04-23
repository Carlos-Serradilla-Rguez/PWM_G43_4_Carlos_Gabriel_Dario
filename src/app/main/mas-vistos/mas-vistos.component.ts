import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from '../../Shared/portada/portada.component';
import { SeriesService } from '../../core/services/series.service';

@Component({
  selector: 'app-mas-vistos',
  standalone: true,
  imports: [PortadaComponent,CommonModule],
  templateUrl: './mas-vistos.component.html',
  styleUrl: './mas-vistos.component.css'
})
export class MasVistosComponent {
  series: any[] = [];
  private seriesService = inject(SeriesService);

  async ngOnInit() {
    this.series = await this.seriesService.getRandomSeries(4);
  }
}

