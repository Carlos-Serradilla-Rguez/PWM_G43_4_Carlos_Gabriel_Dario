import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Ejemplo simple con token en localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // true si hay token, false si no
  }

  login(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
