import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, ReactiveFormsModule, RouterModule, ReactiveFormsModule, RouterLink],
})
export class LoginPage {
  authService: AuthService = inject(AuthService);
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  irARegistro(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => this.router.navigateByUrl('/miperfil'),
        error: (error) => {
          console.error('Error en login:', error);
          // Aquí muestra un mensaje al usuario, ej:
          alert('Usuario o contraseña incorrectos');
        }
      });
  }
}
