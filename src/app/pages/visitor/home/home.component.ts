import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";
import {VisitorService} from "../../../service/visitor/visitor.service";
import {MovieResponse} from "../../../dto";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public title: string = 'Movie List';
  public movieList: MovieResponse[] = [];

  constructor(private visitorService: VisitorService) {
  }

  public ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.visitorService.getMovies().subscribe((movies: MovieResponse[]): void => {
      this.movieList = movies;
    })
  }
}
