import { Injectable } from '@angular/core';
import { AuthResponse } from '../../interface/dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setAuthResponse(authResponse: AuthResponse): void {
    localStorage.setItem('username', authResponse.username);
    localStorage.setItem('roles', JSON.stringify(authResponse.roles));
  }

  public check(): boolean {
    return (
      !!localStorage.getItem('username') && !!localStorage.getItem('roles')
    );
  }

  public getCurrentUsername(): string {
    return localStorage.getItem('username')!;
  }

  public getCurrentUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }
}
