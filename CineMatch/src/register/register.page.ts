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

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  irALogin(): void {
    this.router.navigate(['../login']);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawForm = this.form.getRawValue();
    const displayName = `${rawForm.nombre} ${rawForm.apellidos}`.trim();

    this.authService.register(rawForm.email, rawForm.password, displayName)
      .subscribe(() => {
        this.router.navigateByUrl('/miperfil');
      });
  }
}
