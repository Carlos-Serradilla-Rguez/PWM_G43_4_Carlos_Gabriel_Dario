// src/app/favoritos/favoritos.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule, ToastController} from '@ionic/angular';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  imports: [
    IonicModule
  ]
})
export class FavoritosPage implements OnInit {

  items: any[] = [];        // Lista completa de items desde Firebase
  favoritosIds: string[] = [];  // IDs de favoritos desde SQLite
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private firestore: Firestore
  ) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async ngOnInit() {
    await this.initSQLite();
    await this.loadItems();
    await this.loadFavoritos();
  }

  async initSQLite() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    let db: SQLiteDBConnection | null = null;

    try {
      db = await sqlite.createConnection(
        'favoritosDB',   // database
        false,           // encrypted
        'no-encryption', // mode
        1,               // version
        false            // readonly
      );

      await db.open();

      await db.execute(`CREATE TABLE IF NOT EXISTS favoritos (id TEXT PRIMARY KEY);`);

      // Guarda el db en tu servicio si lo necesitas
      this.db = db;

    } catch (error) {
      console.error('Error inicializando SQLite:', error);
      this.presentToast('Error al inicializar SQLite');
    }

  }

  async loadItems() {
    try {
      const itemsCollection = collection(this.firestore, 'items');
      const snapshot = await getDocs(itemsCollection);
      this.items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      this.presentToast('Error al cargar items');
    }
  }

  async loadFavoritos() {
    if (!this.db) return;
    try {
      const res = await this.db.query('SELECT id FROM favoritos');
      this.favoritosIds = res.values?.map(row => row.id) || [];
    } catch (error) {
      this.presentToast('Error al cargar favoritos');
    }
  }

  isFavorito(id: string): boolean {
    return this.favoritosIds.includes(id);
  }

  async toggleFavorito(id: string) {
    if (!this.db) return;
    try {
      if (this.isFavorito(id)) {
        await this.db.run('DELETE FROM favoritos WHERE id = ?;', [id]);
        this.favoritosIds = this.favoritosIds.filter(favId => favId !== id);
        this.presentToast('Eliminado de favoritos');
      } else {
        await this.db.run('INSERT INTO favoritos (id) VALUES (?);', [id]);
        this.favoritosIds.push(id);
        this.presentToast('Añadido a favoritos');
      }
    } catch (error) {
      this.presentToast('Error al actualizar favoritos');
    }
  }

  goDetalle(id: string) {
    this.router.navigateByUrl(`/detalle/${id}`);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
