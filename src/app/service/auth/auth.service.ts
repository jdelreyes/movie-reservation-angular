import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthRequest, AuthResponse} from '../../dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUri: string = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {
  }

  public authenticate(authRequest: AuthRequest): Observable<AuthResponse> {
    const authResponse: Observable<AuthResponse> =
      this.httpClient.post<AuthResponse>(
        this.authUri + '/authenticate',
        authRequest
      );

    return authResponse;
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse> {
    const authResponse: Observable<AuthResponse> =
      this.httpClient.post<AuthResponse>(
        this.authUri + '/register',
        authRequest
      );

    return authResponse;
  }
}
