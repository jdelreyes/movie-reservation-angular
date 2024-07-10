import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { FieldsetModule } from 'primeng/fieldset';
import { AuthService } from '../../../service/auth/auth.service';
import { AuthResponse } from '../../../dto';
import { Router, RouterLink } from '@angular/router';

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
    FieldsetModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public title: string = 'Register';
  public authResponse!: AuthResponse;

  public formGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public passwordMatches(): boolean {
    return (
      this.formGroup.value.password === this.formGroup.value.confirmPassword
    );
  }

  public register(): void {
    if (!this.passwordMatches()) return;

    this.authService
      .register({
        username: this.formGroup.value.username!,
        password: this.formGroup.value.password!,
      })
      .subscribe((response: AuthResponse): void => {
        this.authResponse = response;
      });

    this.router.navigateByUrl('/');

    localStorage.setItem('token', this.authResponse.token);
  }
}
