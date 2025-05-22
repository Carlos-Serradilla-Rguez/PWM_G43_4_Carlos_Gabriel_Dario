import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  register(email: string, password: string, nombre: string, apellidos: string, username: string, imageFile?: File): Observable<void> {
    // 1. Crear usuario con email y password
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(async (response) => {
        if (!response.user) throw new Error('No se pudo obtener el usuario después del registro');

        // 2. Actualizar displayName en perfil
        await response.user.updateProfile({ displayName: `${nombre} ${apellidos}` });

        // 3. Subir imagen si existe
        let imageUrl = '';
        if (imageFile) {
          const filePath = `users/${response.user.uid}/profile.jpg`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, imageFile);

          // Esperar a que termine la subida
          await task.snapshotChanges().toPromise();

          // Obtener URL de descarga
          imageUrl = await fileRef.getDownloadURL().toPromise();
        }

        // 4. Guardar info en Firestore
        return this.afs.doc(`users/${response.user.uid}`).set({
          uid: response.user.uid,
          email,
          nombre,
          apellidos,
          username,
          imageUrl,
          createdAt: new Date()
        });
      })
    );
  }

  login(email: string, password: string): Observable<void> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password).then(() => {}));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
