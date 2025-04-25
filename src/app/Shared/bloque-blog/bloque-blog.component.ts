import {Component, Input} from '@angular/core';
import {Blog} from '../../core/services/blog.service';
import {NgIf} from "@angular/common";
import {Comentarios} from "../../core/services/comentarios.service";

@Component({
  selector: 'app-bloque-blog',
  imports: [
    NgIf
  ],
  templateUrl: './bloque-blog.component.html',
  styleUrl: './bloque-blog.component.css'
})
export class BloqueBlogComponent {
  @Input() hilo: Blog | Comentarios | null = null;
  @Input() tipo: 'comentario' | 'blog'  = 'blog';

  get esBlog(): boolean {
    return this.tipo === 'blog';
  }

  get blog(): Blog | null {
    return this.esBlog ? this.hilo as Blog : null;
  }

  get comentario(): Comentarios | null {
    return !this.esBlog ? this.hilo as Comentarios : null;
  }

}
