import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "./page/shared/footer/footer.component";
import {HeaderComponent} from "./page/shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
