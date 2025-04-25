import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuscadorComponent } from '../Shared/buscador/buscador.component';
import { AjustesComponent } from '../Shared/ajustes/ajustes.component';
import { SeriesService } from '../core/services/series.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas-series',
  standalone: true,
  templateUrl: './peliculas-series.component.html',
  styleUrls: ['./peliculas-series.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    BuscadorComponent,
    AjustesComponent
  ]
})
export class PeliculasSeriesComponent implements OnInit {
  series: any[] = [];

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
    });
  }
}
