import { Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {PeliculasSeriesComponent} from './peliculas-series/peliculas-series.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'peliculas-series', component: PeliculasSeriesComponent}
];
