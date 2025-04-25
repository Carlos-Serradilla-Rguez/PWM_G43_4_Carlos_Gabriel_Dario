import {Component, inject, OnInit} from '@angular/core';
import {BuscadorComponent} from '../Shared/buscador/buscador.component';
import {BloqueBlogComponent} from '../Shared/bloque-blog/bloque-blog.component';
import {LabelComponent} from '../Shared/label/label.component';
import {Auth} from '@angular/fire/auth';
import {arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {AuthService} from '../auth.service';
import {Blog, BlogService} from '../core/services/blog.service';
import {NgForOf, NgIf} from '@angular/common';
import {CrearHiloComponent} from "./crear-hilo/crear-hilo.component";
import {ActivatedRoute} from "@angular/router";
import {Comentarios, ComentariosService} from "../core/services/comentarios.service";
import {AddMensajeComponent} from "./add-mensaje/add-mensaje.component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [BuscadorComponent, BloqueBlogComponent, LabelComponent, NgForOf, CrearHiloComponent, AddMensajeComponent, NgIf],
})

export class BlogComponent implements OnInit {
  private auth = inject(Auth);
  private db = inject(Firestore);
  private authService = inject(AuthService);
  hilosAMostrar: Blog[] | Comentarios[] = [];
  tipo: 'comentario' | 'blog' = 'blog';
  id: string | null = null;
  mostrarCrearHilo: boolean = true;  // Control para cambiar entre los componentes

  constructor(
      private blogService: BlogService,
      private comentarioService: ComentariosService,
      private route: ActivatedRoute // Inyectamos ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // Obtenemos el 'id' de la URL

      // Solo ejecutamos la suscripción si no hay 'id'
      if (!this.id) {
        console.log("No hay ningún id");
        this.tipo = 'blog';
        this.blogService.getThreads().subscribe(data => {
          this.hilosAMostrar = data;
        });
      } else {
        console.log("Hay id")
        this.tipo = 'comentario';
        this.mostrarCrearHilo = false;  // Cambia el componente que se debe mostrar
        this.comentarioService.getComentario(this.id).subscribe(data => {
          this.hilosAMostrar = data;
        });
      }
    });
  }

  onIdSelected(id: string | void): void {
    // Al recibir el id desde el hijo, cargamos los comentarios para ese id
    console.log("Id", id);
    if(id != null) {
      console.log(this.mostrarCrearHilo);
      this.tipo = 'comentario';
      console.log(this.mostrarCrearHilo);
      this.comentarioService.getComentario(id).subscribe((data) => {
        this.hilosAMostrar = data;
      })
    }
  }
}
