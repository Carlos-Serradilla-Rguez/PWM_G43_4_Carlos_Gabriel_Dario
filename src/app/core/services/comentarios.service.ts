import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, Firestore, getDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Blog} from "./blog.service";

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

  async addComentario(comentario: Comentarios, hiloId: string) {
    const hiloRef = doc(this.firestore, 'hilos', hiloId);  // Referencia al hilo con el ID
    const comentariosRef = collection(hiloRef, 'comentarios');  // Subcolección 'comentarios' dentro del hilo

    // Verifica si el hilo existe
    const hiloDoc = await getDoc(hiloRef);
    if (hiloDoc.exists()) {
      // Si el hilo existe, añade el comentario a la subcolección de comentarios
      return addDoc(comentariosRef, comentario);
    } else {
      // Si el hilo no existe, puedes crear el hilo o manejarlo de otra forma
      console.error('El hilo no existe');
      return;
    }
  }
}
