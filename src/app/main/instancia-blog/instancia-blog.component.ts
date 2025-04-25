import {Component, Input, OnInit} from '@angular/core';
import {BloqueBlogComponent} from '../../Shared/bloque-blog/bloque-blog.component';
import {Blog, BlogService} from '../../core/services/blog.service';

@Component({
  selector: 'app-instancia-blog',
  imports: [BloqueBlogComponent],
  templateUrl: './instancia-blog.component.html',
  styleUrl: './instancia-blog.component.css'
})
export class InstanciaBlogComponent implements OnInit {
  blogAleatorio: Blog | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getRandomThreads(1).then((blogs) => {
      this.blogAleatorio = blogs[0];
    });
  }
}
