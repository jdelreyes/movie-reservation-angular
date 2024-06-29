import { Routes } from '@angular/router';
import { AuthenticateComponent } from './pages/auth/authenticate/authenticate.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: AuthenticateComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: AuthenticateComponent },
];
