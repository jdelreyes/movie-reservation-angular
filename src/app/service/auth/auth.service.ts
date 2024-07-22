import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse } from '../../interface/dto';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUri: string = 'http://localhost:8080/api/auth';

  constructor(
    private httpClient: HttpClient,
    // todo: test if working
    private cookieService: CookieService
  ) {}

  public authenticate(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      this.authUri + '/authenticate',
      authRequest,
      { withCredentials: true }
    );
  }

  public register(authRequest: AuthRequest): Observable<void> {
    return this.httpClient.post<void>(this.authUri + '/register', authRequest);
  }

  public logout() {
    return this.httpClient.put<void>(this.authUri + '/logout', null, {
      withCredentials: true,
    });
  }

  public isCurrentUserAdmin() {
    console.log(this.cookieService.get('roles'));
    // this.cookieService.get('roles');
  }
}
