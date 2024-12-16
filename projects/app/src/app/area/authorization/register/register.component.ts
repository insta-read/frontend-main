import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <form (ngSubmit)="onRegister()">
      <input
        [(ngModel)]="userDetails.firstname"
        name="name"
        type="text"
        placeholder="Name"
        required
      />
      <input
        [(ngModel)]="userDetails.lastname"
        name="name"
        type="text"
        placeholder="Name"
        required
      />
      <input
        [(ngModel)]="userDetails.email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        [(ngModel)]="userDetails.password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  userDetails = { firstname: '', lastname: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.userDetails).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Registration failed', err),
    });
  }
}