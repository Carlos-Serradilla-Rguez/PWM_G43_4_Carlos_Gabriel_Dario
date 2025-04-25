import {Component, inject, OnInit} from '@angular/core';
import {BuscadorComponent} from '../Shared/buscador/buscador.component';
import {BloqueBlogComponent} from '../Shared/bloque-blog/bloque-blog.component';
import {LabelComponent} from '../Shared/label/label.component';
import {Auth} from '@angular/fire/auth';
import {arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {AuthService} from '../auth.service';
import {Blog, BlogService} from '../core/services/blog.service';
import {NgForOf} from '@angular/common';
import {CrearHiloComponent} from "./crear-hilo/crear-hilo.component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [BuscadorComponent, BloqueBlogComponent, LabelComponent, NgForOf, CrearHiloComponent],
})

export class BlogComponent implements OnInit {
  private auth = inject(Auth);
  private db = inject(Firestore);
  private authService = inject(AuthService);
  hilosAMostrar: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getThreads().subscribe(data => {
      this.hilosAMostrar = data;
    })
  }
}
