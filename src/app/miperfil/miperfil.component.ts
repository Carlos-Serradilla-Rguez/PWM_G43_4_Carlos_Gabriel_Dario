import { Component, inject } from '@angular/core';
import {CarruselComponent} from '../Shared/carrusel/carrusel.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [CarruselComponent],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})

export class MiperfilComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.error('Error cerrando sesión', err),
    });
  }
}
