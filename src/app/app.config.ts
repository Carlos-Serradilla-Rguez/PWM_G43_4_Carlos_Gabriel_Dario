import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOoa6ilD0Um_K4TxlhUYs0HJcdlvx_tnA",
  authDomain: "pwmg43-e26ab.firebaseapp.com",
  databaseURL: "https://pwmg43-e26ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pwmg43-e26ab",
  storageBucket: "pwmg43-e26ab.firebasestorage.app",
  messagingSenderId: "807341448731",
  appId: "1:807341448731:web:950814a5db37e0ac5662be"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()=>getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};


;
