import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, ReactiveFormsModule],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  irARegistro(): void {
    this.router.navigate(['../register']);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => this.router.navigateByUrl('/miperfil'),
      });
  }

}
