import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public title: string = 'Register';

  public authRequest = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  public passwordMatches(): boolean {
    return (
      this.authRequest.value.password === this.authRequest.value.confirmPassword
    );
  }

  public register() {
    this.authService.register({
      username: this.authRequest.value.username!,
      password: this.authRequest.value.password!,
    });
  }
}
