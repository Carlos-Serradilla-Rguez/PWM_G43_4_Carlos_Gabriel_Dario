import {Component, Input} from '@angular/core';
import {Blog} from '../../core/services/blog.service';

@Component({
  selector: 'app-bloque-blog',
  imports: [],
  templateUrl: './bloque-blog.component.html',
  styleUrl: './bloque-blog.component.css'
})
export class BloqueBlogComponent {
  @Input() hilo: Blog | null = null;
}
