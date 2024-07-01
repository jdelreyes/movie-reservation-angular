import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public links: string[] = ['/home']

  public constructor(private router: Router) {
  }
}
