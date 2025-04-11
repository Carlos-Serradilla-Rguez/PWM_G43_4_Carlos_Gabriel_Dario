import { Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {PeliculasSeriesComponent} from './peliculas-series/peliculas-series.component';
import {DescubrirComponent} from './descubrir/descubrir.component';
import {BlogComponent} from "./blog/blog.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {path: 'peliculas-series', component: PeliculasSeriesComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'descubrir', component: DescubrirComponent}


];
