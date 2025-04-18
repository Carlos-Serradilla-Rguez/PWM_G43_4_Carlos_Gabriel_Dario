import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Serie {
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
}
