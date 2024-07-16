import { Routes } from '@angular/router';
import { AuthenticateComponent } from './page/auth/authenticate/authenticate.component';
import { RegisterComponent } from './page/auth/register/register.component';
import { HomeComponent } from './page/visitor/home/home.component';
import { MovieDetailsComponent } from './page/visitor/movie-details/movie-details.component';
import { DashboardComponent } from './page/visitor/dashboard/dashboard.component';
import { ProfileComponent } from './page/user/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthenticateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id/:title', component: MovieDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: HomeComponent },
];
