import { Component } from '@angular/core';
import {Blog, BlogService} from '../../core/services/blog.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-crear-hilo',
  imports: [
    FormsModule
  ],
  templateUrl: './crear-hilo.component.html',
  styleUrl: './crear-hilo.component.css'
})
export class CrearHiloComponent {
  newThread: Blog = {
    titulo: '',
    contenido: '',
    usuario: ''
  };

  constructor(private blogService: BlogService) {}

  crearHilo() {
    this.newThread.usuario = "Carlos";
    console.log(this.newThread);
    if (this.newThread.titulo && this.newThread.contenido && this.newThread.usuario) {
      this.blogService.addThread(this.newThread)
        .then(() => {
          console.log('Hilo creado con éxito');
          this.newThread = { titulo: '', contenido: '', usuario: '' }; // resetea el formulario
        })
        .catch(error => console.error('Error al crear hilo:', error));
    } else {
      alert('Completa todos los campos');
    }
  }
}
