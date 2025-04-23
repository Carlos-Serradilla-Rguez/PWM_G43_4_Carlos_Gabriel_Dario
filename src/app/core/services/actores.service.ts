import { Injectable } from '@angular/core';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';

export interface Actor {
  id?: string;
  nombre: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(private firestore: Firestore) { }

  async getActorById(id: string): Promise<Actor | null> {
    const docRef = doc(this.firestore, `actores/${id}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Actor) : null;
  }
}
