import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CookieService } from 'ngx-cookie-service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterLink, SplitButtonModule],
  providers: [CookieService],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public title: string = 'Movie Reservation App';
  public username: string | null = null;
  public items: MenuItem[] = [];

  public constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        command: () => {
          this.router.navigateByUrl('/profile');
        },
      },
      { separator: true },
      {
        label: 'Logout',
        command: () => {
          this.authService.logout().subscribe({
            next: (v) => {
              this.cookieService.deleteAll();
              this.router.navigate(['']);
            },
          });
        },
      },
    ];

    this.getName();
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('username');
  }

  public navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  private getName(): void {
    if (this.isLoggedIn()) this.username = this.cookieService.get('username');
  }
}
