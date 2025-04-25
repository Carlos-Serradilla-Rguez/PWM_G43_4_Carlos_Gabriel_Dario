import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Serie, SeriesService} from '../core/services/series.service';
import {Actor, ActoresService} from '../core/services/actores.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, getDoc, arrayUnion,arrayRemove } from '@angular/fire/firestore';
import {CarruselComponent} from '../Shared/carrusel/carrusel.component';

@Component({
  selector: 'app-desciptor-pelicula',
  imports: [CommonModule, CarruselComponent],
  templateUrl: './desciptor-pelicula.component.html',
  styleUrl: './desciptor-pelicula.component.css'
})
export class DesciptorPeliculaComponent implements OnInit {
  pelicula: any;
  mensaje: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  actores: Actor[] = [];
  peliculasAleatorias: Serie[] = [];

  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,
    private actoresService: ActoresService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.seriesService.getSerieById(id).then(async (data: any) => {
        this.pelicula = data;
        this.pelicula.id = id;

        const actorIds: string[] = this.pelicula.actores || [];

        if (actorIds.length > 0) {
          this.actores = [];

          for (const actorId of actorIds) {
            const actorData = await this.actoresService.getActorById(actorId);
            if (actorData) {
              this.actores.push(actorData);
            }
          }
        }

        console.log(this.actores);
      });
    }

    this.seriesService.getRandomSeries(20).then((randomSeries) => {
      this.peliculasAleatorias = randomSeries;
    })
  }



  async anadirOEliminarDeLaLista() {
    const user = this.auth.currentUser;
    if (!user || !this.pelicula?.id) {
      console.error('Usuario no autenticado o película no válida');
      return;
    }

    const uid = user.uid;
    const peliculaId = this.pelicula.id;
    const userRef = doc(this.firestore, 'usuarios', uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        lista_de_peliculas: [peliculaId]
      });
      this.mensaje = '✅ Película añadida a tu lista';
    } else {
      const data = docSnap.data();
      const lista: string[] = data['lista_de_peliculas'] || [];

      if (lista.includes(peliculaId)) {
        await updateDoc(userRef, {
          lista_de_peliculas: arrayRemove(peliculaId)
        });
        this.mensaje = 'Película retirada de tu lista';
      } else {
        await updateDoc(userRef, {
          lista_de_peliculas: arrayUnion(peliculaId)
        });
        this.mensaje = 'Película añadida a tu lista';
      }
    }

    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  onIdSelected(id: string | void): void {
    // Al recibir el id desde el hijo, cargamos los comentarios para ese id
    console.log("Id", id);
    if(id != null) {
      this.seriesService.getSerieById(id).then(async (data: any) => {
        this.pelicula = data;
        this.pelicula.id = id;

        const actorIds: string[] = this.pelicula.actores || [];

        if (actorIds.length > 0) {
          this.actores = [];

          for (const actorId of actorIds) {
            const actorData = await this.actoresService.getActorById(actorId);
            if (actorData) {
              this.actores.push(actorData);
            }
          }
        }
        console.log(this.actores);
      });

      this.seriesService.getRandomSeries(20).then((randomSeries) => {
        this.peliculasAleatorias = randomSeries;
      })
    }
  }
}
