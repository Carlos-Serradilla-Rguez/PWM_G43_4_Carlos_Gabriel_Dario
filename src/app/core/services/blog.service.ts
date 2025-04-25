import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Blog {
  id: string;
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
    const threadsRef = collection(this.firestore, 'blog');
    return collectionData(threadsRef, { idField: 'id' }) as Observable<Blog[]>;
  }
}
