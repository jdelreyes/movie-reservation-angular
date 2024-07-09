import { Routes } from '@angular/router';
import { AuthenticateComponent } from './pages/auth/authenticate/authenticate.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/visitor/home/home.component';
import { MovieDetailsComponent } from './pages/visitor/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthenticateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id/:details', component: MovieDetailsComponent },
  { path: '**', component: HomeComponent },
];
