import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para leer el ID desde la URL
import { SeriesService } from '../../core/services/series.service';

@Component({
  selector: 'app-desciptor-pelicula',
  imports: [],
  templateUrl: './desciptor-pelicula.component.html',
  styleUrl: './desciptor-pelicula.component.css'
})
export class DesciptorPeliculaComponent implements OnInit {
  pelicula: any;

  constructor(
    private route: ActivatedRoute,          // << ESTA LÍNEA ES IMPORTANTE
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.seriesService.getSerieById(id).then((data: any) => {
        this.pelicula = data;
        console.log(this.pelicula);
      });
    }
  }
}
