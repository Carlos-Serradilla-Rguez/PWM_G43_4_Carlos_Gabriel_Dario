import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Serie {
  id?: string;
  nombre: string;
  sinopsis: string;
  portada: string;
  actores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private firestore: Firestore) {}

  getSeries(): Observable<Serie[]> {
    const seriesRef = collection(this.firestore, 'series');
    return collectionData(seriesRef, { idField: 'id' }) as Observable<Serie[]>;
  }

  async getSerieById(id: string): Promise<Serie | null> {
    const docRef = doc(this.firestore, `series/${id}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Serie) : null;
  }
}
