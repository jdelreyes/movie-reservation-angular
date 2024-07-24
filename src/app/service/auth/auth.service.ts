import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse } from '../../interface/dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUri: string = environment.SERVER_URL + '/api/auth';

  constructor(private httpClient: HttpClient) {}

  authenticate(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      this.authUri + '/authenticate',
      authRequest,
      { withCredentials: true }
    );
  }

  register(authRequest: AuthRequest): Observable<void> {
    return this.httpClient.post<void>(this.authUri + '/register', authRequest);
  }

  logout() {
    return this.httpClient.put<void>(this.authUri + '/logout', null, {
      withCredentials: true,
    });
  }
}
