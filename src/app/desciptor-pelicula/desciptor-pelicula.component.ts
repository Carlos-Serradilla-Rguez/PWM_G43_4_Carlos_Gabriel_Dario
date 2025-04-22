import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../core/services/series.service';
import {Actor, ActoresService} from '../core/services/actores.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, getDoc, arrayUnion,arrayRemove } from '@angular/fire/firestore';

@Component({
  selector: 'app-desciptor-pelicula',
  imports: [CommonModule],
  templateUrl: './desciptor-pelicula.component.html',
  styleUrl: './desciptor-pelicula.component.css'
})
export class DesciptorPeliculaComponent implements OnInit {
  pelicula: any;
  mensaje: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  actores: Actor[] | null = null;

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

  async busquedaDeActores() {
    if (this.pelicula?.actores?.length > 0) {
      const actorPromise = this.pelicula.actores.map((actorId: string)=>
        this.actoresService.getActorById(actorId)
      );

      this.actores = await Promise.all(actorPromise)
    }
  }
}
