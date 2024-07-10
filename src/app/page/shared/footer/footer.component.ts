import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public constructor(private router: Router) {}
}
