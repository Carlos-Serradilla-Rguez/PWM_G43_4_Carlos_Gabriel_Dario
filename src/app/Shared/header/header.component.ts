import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('menu') menuRef!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  goToSeriesPeliculas() {
    this.router.navigate(['/peliculas-series']);
  }

  toggleMenu(): void {
    const menu = this.menuRef.nativeElement;
    menu.classList.toggle('show');
  }

  closeMenuIfClickedOutside(event: MouseEvent): void {
    const menu = this.menuRef?.nativeElement;
    const button = document.querySelector('.bubble-button');

    if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
      menu.classList.remove('show');
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.closeMenuIfClickedOutside.bind(this));
  }
}
