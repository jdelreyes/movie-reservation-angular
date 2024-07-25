import { Route } from '@angular/router';
import { AuthenticateComponent } from './page/auth/authenticate/authenticate.component';
import { RegisterComponent } from './page/auth/register/register.component';
import { HomeComponent } from './page/visitor/home/home.component';
import { MovieDetailsComponent } from './page/visitor/movie-details/movie-details.component';
import { DashboardComponent } from './page/visitor/dashboard/dashboard.component';
import { ProfileComponent } from './page/user/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { BuyTicketComponent } from './page/user/buy-ticket/buy-ticket.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthenticateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id/:title', component: MovieDetailsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'buy-ticket',
    component: BuyTicketComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: HomeComponent },
];
