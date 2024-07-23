import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
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
import { Router, RouterLink } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-authenticate',
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
  templateUrl: './authenticate.component.html',
})
export class AuthenticateComponent implements OnInit {
  title: string = 'Authenticate';

  formGroup!: FormGroup;
  isFormSubmitted: boolean = false;

  serverErrorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  authenticate(): void {
    this.isFormSubmitted = true;
    if (this.formGroup.invalid) return;

    this.authService
      .authenticate({
        username: this.formGroup.value.username!,
        password: this.formGroup.value.password!,
      })
      .subscribe({
        next: (v) => {
          this.localStorageService.setAuthResponse(v);
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          if (e.status === 404) {
            this.serverErrorMessage = 'Username does not exist';
          }
          if (e.status === 409) {
            this.serverErrorMessage = 'Username and/or password is incorrect';
          }
        },
      });
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
