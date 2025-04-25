import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData, doc, getDoc, addDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Serie} from './series.service';

export interface Blog {
  id?: string;
  titulo: string;
  contenido: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private firestore: Firestore) {}

  getThreads(): Observable<Blog[]> {
    const threadsRef = collection(this.firestore, 'hilos');
    return collectionData(threadsRef, { idField: 'id' }) as Observable<Blog[]>;
  }

  async addThread(thread: Blog) {
    const threadsRef = collection(this.firestore, 'hilos');
    return addDoc(threadsRef, thread);
  }

  // 🔁 Devuelve una cantidad aleatoria de hilos (blogs)
  async getRandomThreads(n: number): Promise<Blog[]> {
    const blogs = await this.getBlogsAsArray(); // Obtiene todos los hilos
    const shuffled = this.shuffle(blogs); // Mezcla aleatoriamente
    return shuffled.slice(0, n); // Devuelve los primeros n
  }

  // 🔄 Convierte el observable de hilos en un array
  private async getBlogsAsArray(): Promise<Blog[]> {
    const blogsObservable = this.getThreads();
    const blogsArray: Blog[] = [];
    await new Promise<void>((resolve) => {
      blogsObservable.subscribe((blogs) => {
        blogsArray.push(...blogs);
        resolve();
      });
    });
    return blogsArray;
  }

  // 🔀 Mezcla aleatoriamente un array (Fisher-Yates)
  private shuffle(array: Blog[]): Blog[] {
    let currentIndex = array.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

