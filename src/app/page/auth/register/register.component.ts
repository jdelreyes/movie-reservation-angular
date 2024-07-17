import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {
  public title: string = 'Register';

  public formGroup!: FormGroup;
  public isFormSubmitted: boolean = false;

  public serverErrorMessage!: string;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
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
  }

  public passwordMatches(): boolean {
    return (
      this.formGroup.value.password === this.formGroup.value.confirmPassword
    );
  }

  public register(): void {
    this.isFormSubmitted = true;
    if (!this.passwordMatches()) return;
    if (this.formGroup.invalid) return;

    this.authService
      .register({
        username: this.formGroup.value.username!,
        password: this.formGroup.value.password!,
      })
      .subscribe({
        next: (v) => {
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          if (e.status === 403) {
            this.serverErrorMessage = 'Username already exists';
          }
        },
      });
  }

  public get username() {
    return this.formGroup.get('username');
  }

  public get password() {
    return this.formGroup.get('password');
  }

  public get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
}
