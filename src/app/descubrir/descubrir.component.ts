import {Component, inject, OnInit} from '@angular/core';
import {Serie, SeriesService} from '../core/services/series.service';
import {arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-descubrir',
  imports: [],
  templateUrl: './descubrir.component.html',
  styleUrl: './descubrir.component.css'
})
export class DescubrirComponent implements OnInit{
  private auth = inject(Auth);
  private db = inject(Firestore);
  private authService = inject(AuthService);
  peliculasAleatorias: Serie[] = [];
  peliculaAleatoria: Serie | null = null;
  listaPeliculas: any[] = [];
  private firestore: Firestore = inject(Firestore);

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getRandomSeries(1).then((randomSeries) => {
      this.peliculasAleatorias = randomSeries;
      this.peliculaAleatoria = this.peliculasAleatorias[0];
      console.log(this.peliculaAleatoria);
    })
  }

  async anadirALaLista() {
    const user = this.auth.currentUser;
    if (!user || !this.peliculaAleatoria?.id) {
      console.error('Usuario no autenticado o película no válida');
      return;
    }

    const uid = user.uid;
    const peliculaId = this.peliculaAleatoria.id;
    const userRef = doc(this.firestore, 'usuarios', uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        lista_de_peliculas: [peliculaId]
      });
    } else {
      const data = docSnap.data();
      const lista: string[] = data['lista_de_peliculas'] || [];

      if (lista.includes(peliculaId)) {

      } else {
        await updateDoc(userRef, {
          lista_de_peliculas: arrayUnion(peliculaId)
        });
      }
    }

    this.cargarNuevaPelicula();

    setTimeout(() => {
    }, 3000);
  }

  async EliminarDeLaLista() {
    const user = this.auth.currentUser;
    if (!user || !this.peliculaAleatoria?.id) {
      console.error('Usuario no autenticado o película no válida');
      return;
    }

    const uid = user.uid;
    const peliculaId = this.peliculaAleatoria.id;
    const userRef = doc(this.firestore, 'usuarios', uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        lista_de_peliculas: [peliculaId]
      });
    } else {
      const data = docSnap.data();
      const lista: string[] = data['lista_de_peliculas'] || [];

      if (lista.includes(peliculaId)) {
        await updateDoc(userRef, {
          lista_de_peliculas: arrayRemove(peliculaId)
        });
      } else {
      }
    }

    this.cargarNuevaPelicula();

    setTimeout(() => {
    }, 3000);
  }

  async cargarNuevaPelicula() {
    this.seriesService.getRandomSeries(1).then((randomSeries) => {
      this.peliculasAleatorias = randomSeries;
      this.peliculaAleatoria = this.peliculasAleatorias[0];
      console.log(this.peliculaAleatoria);
    })
  }
}
