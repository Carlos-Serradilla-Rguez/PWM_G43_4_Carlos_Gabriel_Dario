import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MainComponent } from './main/main.component';
import {HeaderComponent} from './Shared/header/header.component';
import {FooterComponent} from './Shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
