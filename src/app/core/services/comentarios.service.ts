import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Comentarios {
  id?: string,
  contenido: string,
  usuario: string
}


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private firestore: Firestore) {}

  getComentario(idHilo: string): Observable<Comentarios[]> {
    const comentariosRef = collection(this.firestore, `hilos/${idHilo}/comentarios`);
    return collectionData(comentariosRef, { idField: 'id' }) as Observable<Comentarios[]>;
  }
}
