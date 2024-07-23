import { Injectable } from '@angular/core';
import { AuthResponse } from '../../interface/dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setAuthResponse(authResponse: AuthResponse): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('username', authResponse.username);
      localStorage.setItem('roles', JSON.stringify(authResponse.roles));
    }
  }

  check(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return (
      !!localStorage.getItem('username') && !!localStorage.getItem('roles')
    );
  }

  getCurrentUsername(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    return localStorage.getItem('username');
  }

  getCurrentUserRoles(): string[] | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : null;
  }

  clearLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'testValue');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
