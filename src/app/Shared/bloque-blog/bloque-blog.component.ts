import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-bloque-blog',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './bloque-blog.component.html',
  styleUrls: ['./bloque-blog.component.css']
})
export class BloqueBlogComponent {
  comentarios = [
    { id: 1, autor: 'Ana', texto: 'Muy interesante tu post' },
    { id: 2, autor: 'Luis', texto: 'Me gustaría ver más sobre este tema' }
  ];

  nuevoComentario = {
    id: 0,
    autor: '',
    texto: ''
  };

  editando: boolean = false;

  agregarComentario() {
    if (this.nuevoComentario.autor && this.nuevoComentario.texto) {
      const nuevoId = this.comentarios.length > 0
        ? Math.max(...this.comentarios.map(c => c.id)) + 1
        : 1;

      this.comentarios.push({
        ...this.nuevoComentario,
        id: nuevoId
      });

      this.limpiarFormulario();
    }
  }

  editarComentario(comentario: any) {
    this.nuevoComentario = { ...comentario };
    this.editando = true;
  }

  actualizarComentario() {
    const index = this.comentarios.findIndex(c => c.id === this.nuevoComentario.id);
    if (index !== -1) {
      this.comentarios[index] = { ...this.nuevoComentario };
    }
    this.limpiarFormulario();
  }

  eliminarComentario(id: number) {
    this.comentarios = this.comentarios.filter(c => c.id !== id);
    if (this.nuevoComentario.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.nuevoComentario = { id: 0, autor: '', texto: '' };
    this.editando = false;
  }
}
