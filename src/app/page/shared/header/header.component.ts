import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCameraRetro, faIcons } from '@fortawesome/free-solid-svg-icons';
import { ToastModule } from 'primeng/toast';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    SplitButtonModule,
    FontAwesomeModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public title: string = 'Movie Reservation App';
  public username: string | null = null;
  public items: MenuItem[] = [];
  public faCameraRetro = faCameraRetro;
  public faIcons = faIcons;

  public constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
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
              this.localStorageService.clearLocalStorage();
              this.router.navigate(['/']);
            },
            complete: () => {
              this.showToast();
            },
          });
        },
      },
    ];

    this.getName();
  }

  public isLoggedIn(): boolean {
    return this.localStorageService.check();
  }

  public navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  private showToast(): void {
    this.messageService.add({
      severity: 'success',
      detail: 'Successfully Logged Out',
      summary: 'Success',
    });
  }

  private getName(): void {
    if (this.isLoggedIn()) this.username = this.localStorageService.getCurrentUsername();
  }
}
