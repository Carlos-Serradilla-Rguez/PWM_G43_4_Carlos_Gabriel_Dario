import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../Shared/header/header.component';
import { FooterComponent } from '../Shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BuscadorComponent } from '../Shared/buscador/buscador.component';
import { AjustesComponent } from '../Shared/ajustes/ajustes.component';
import { PortadaComponent } from '../Shared/portada/portada.component';
import { SeriesService } from '../../core/services/series.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas-series',
  standalone: true,
  templateUrl: './peliculas-series.component.html',
  styleUrls: ['./peliculas-series.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    BuscadorComponent,
    AjustesComponent,
    PortadaComponent
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
