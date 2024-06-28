import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent {
  public header: string = 'Login';

  constructor(private authService: AuthService) {}

  public authenticate() {
  }
}
