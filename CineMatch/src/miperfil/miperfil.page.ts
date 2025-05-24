import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  private auth = inject(Auth);
  private db = inject(Firestore);
  protected authService = inject(AuthService);
  private router = inject(Router);

  nombre: string = '';
  imageUrl: string = '';

  async ngOnInit(): Promise<void> {
    const user = await this.auth.currentUser;
    if (!user) return;

    const userDocRef = doc(this.db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.nombre = `${data['nombre']} ${data['apellidos']}`;
      this.imageUrl = data['imageUrl'] || '';
    }
  }

  cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.error('Error cerrando sesión', err),
    });
  }
}
