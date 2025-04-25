import {Component, OnInit} from '@angular/core';
import {Blog, BlogService} from '../../core/services/blog.service';
import {FormsModule} from '@angular/forms';
import {Comentarios, ComentariosService} from '../../core/services/comentarios.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-mensaje',
  imports: [
    FormsModule
  ],
  templateUrl: './add-mensaje.component.html',
  styleUrl: './add-mensaje.component.css'
})
export class AddMensajeComponent implements OnInit {
  newComentario: Comentarios = {
    contenido: '',
    usuario: ''
  };
  hiloId: string | null = null;

  constructor(
    private comentarioService: ComentariosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hiloId = params['id'];
      console.log('ID:', this.hiloId);
    })
  }

  addComentario() {
    this.newComentario.usuario = "Carlos"; // Puedes asignar el usuario de manera fija o dinámica
    console.log(this.newComentario);

    if (this.newComentario.contenido && this.newComentario.usuario && this.hiloId) {
      // Ahora pasamos el 'id' de la URL al servicio
      this.comentarioService.addComentario(this.newComentario, this.hiloId)  // Pasamos el id del hilo
        .then(() => {
          console.log('Comentario agregado con éxito');
          this.newComentario = { contenido: '', usuario: '' }; // Resetea el formulario
        })
        .catch(error => console.error('Error al agregar comentario:', error));
    } else {
      alert('Completa todos los campos');
    }
  }
}
