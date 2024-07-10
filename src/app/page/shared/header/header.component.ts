import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public title: string = 'Movie Reservation App';

  // todo: edit later
  public isLoggedIn(): boolean {
    return false;
  }
}
