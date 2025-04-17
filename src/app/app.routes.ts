import { Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {PeliculasSeriesComponent} from './peliculas-series/peliculas-series.component';
import {DescubrirComponent} from './descubrir/descubrir.component';
import {BlogComponent} from "./blog/blog.component";
import {MiperfilComponent} from './miperfil/miperfil.component';
import {authGuard} from '../core/guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {path: 'peliculas-series', component: PeliculasSeriesComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'descubrir', component: DescubrirComponent},
  {
    path: 'miperfil',
    component: MiperfilComponent,
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];
