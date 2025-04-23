import { Component, OnInit, inject } from '@angular/core';
import { CarruselComponent } from '../Shared/carrusel/carrusel.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [CarruselComponent],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})
export class MiperfilComponent implements OnInit {
  private auth = inject(Auth);
  private db = inject(Firestore);
  private authService = inject(AuthService);
  private router = inject(Router);


  listaPeliculas: any[] = [];

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const userDocRef = doc(this.db, 'usuarios', user.uid);
    getDoc(userDocRef).then(async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ids = data['lista_de_peliculas'] || [];
        this.listaPeliculas = await Promise.all(ids.map(async (id: string) => {
          const serieDoc = await getDoc(doc(this.db, 'series', id));
          return serieDoc.exists() ? { id: serieDoc.id, ...serieDoc.data() } : null;
        }));
        this.listaPeliculas = this.listaPeliculas.filter(p => p !== null);
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.error('Error cerrando sesión', err),
    });
  }
}
