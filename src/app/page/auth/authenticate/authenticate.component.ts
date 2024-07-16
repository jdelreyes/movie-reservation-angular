import { Component } from '@angular/core';
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
export class AuthenticateComponent {
  public title: string = 'Authenticate';

  public formGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public authenticate(): void {
    this.authService
      .authenticate({
        username: this.formGroup.value.username!,
        password: this.formGroup.value.password!,
      })
      .subscribe({
        next: (v) => {
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {},
      });
  }
}
