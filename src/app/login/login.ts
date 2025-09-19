import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoginMode = true;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  
  loginData = {
    email: '',
    password: ''
  };

 
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.messageType = '';
  }

 
  onLogin() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === this.loginData.email && user.password === this.loginData.password) {
        this.message = ` Welcome ${user.firstName}!`;
        this.messageType = 'success';

       
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);

      } else {
        this.message = ' Invalid email or password';
        this.messageType = 'error';
      }
    } else {
      this.message = 'No user registered yet';
      this.messageType = 'error';
    }
  }

  
  onRegister() {
    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.email || !this.registerData.password) {
      this.message = 'Please fill in all fields';
      this.messageType = 'error';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.message = 'Passwords do not match';
      this.messageType = 'error';
      return;
    }

   
    localStorage.setItem('user', JSON.stringify(this.registerData));
    this.message = ` Registered successfully! Welcome ${this.registerData.firstName}`;
    this.messageType = 'success';

  
    setTimeout(() => {
      this.toggleMode();
    }, 1000);
  }
}
