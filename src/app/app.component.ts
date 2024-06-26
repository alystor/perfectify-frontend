import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.title)
  }

}
