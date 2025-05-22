import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [ReactiveFormsModule, RouterModule, IonicModule],
})
export class RegisterPage {
  authService: AuthService = inject(AuthService);
  form: FormGroup;
  selectedFile?: File;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawForm = this.form.getRawValue();

    this.authService.register(
      rawForm.email,
      rawForm.password,
      rawForm.nombre,
      rawForm.apellidos,
      rawForm.username,
      this.selectedFile
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/miperfil');
      },
      error: err => {
        console.error('Error al registrar:', err);
      }
    });
  }
}
