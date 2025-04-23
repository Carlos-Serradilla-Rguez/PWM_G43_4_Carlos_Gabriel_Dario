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

  // Método para obtener n series aleatorias
  async getRandomSeries(n: number): Promise<Serie[]> {
    const series = await this.getSeriesAsArray(); // Obtiene todas las series como un array
    const shuffled = this.shuffle(series); // Mezcla las series
    return shuffled.slice(0, n); // Devuelve las primeras n series aleatorias
  }

  // Método para obtener las series como un array (ya que getSeries es un Observable)
  private async getSeriesAsArray(): Promise<Serie[]> {
    const seriesObservable = this.getSeries(); // Obtiene el observable de todas las series
    const seriesArray: Serie[] = [];
    await new Promise<void>((resolve) => {
      seriesObservable.subscribe((series) => {
        seriesArray.push(...series);
        resolve();
      });
    });
    return seriesArray;
  }

  // Método para mezclar el array de series aleatoriamente (Fisher-Yates shuffle)
  private shuffle(array: Serie[]): Serie[] {
    let currentIndex = array.length, randomIndex, temporaryValue;
    // Mientras haya elementos a mezclar
    while (currentIndex !== 0) {
      // Selecciona un índice aleatorio
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Intercambia los elementos
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
