import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse } from '../../dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private serverUrl: string = 'https://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  public authenticate(authRequest: AuthRequest): Observable<AuthResponse> {
    let authResponse: Observable<AuthResponse> =
      this.httpClient.post<AuthResponse>(
        this.serverUrl + '/authenticate',
        authRequest
      );

    return authResponse;
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse> {
    let authResponse: Observable<AuthResponse> =
      this.httpClient.post<AuthResponse>(
        this.serverUrl + '/register',
        authRequest
      );

    return authResponse;
  }
}
