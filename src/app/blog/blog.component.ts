import { Component, OnInit } from '@angular/core';

interface Comentario {
  id_comentario: number;
  usuario: string;
  comentario: string;
}

interface Foro {
  id: number;
  titulo: string;
  contenido: string;
  comentarios: Comentario[];
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  hilos: Foro[] = [];

  async ngOnInit(): Promise<void> {
    this.cargarHilo();
  }

  async cargarHilo(): Promise<void> {
    try {
      const response = await fetch('/assets/foro.json');
      const base = await response.json();
      const extra = JSON.parse(localStorage.getItem('foro_extra') || '[]');
      this.hilos = base.concat(extra).slice(0, 5);
    } catch (err) {
      console.error('Error al cargar hilos:', err);
    }
  }

  verComentarios(id: number): void {
    // Esto puede ser un router.navigate a otra vista
    window.location.href = '/blog?idBlog=' + id;
  }

  recargar(): void {
    location.reload();
  }
}
