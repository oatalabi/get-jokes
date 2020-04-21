
import { Component, OnInit } from '@angular/core';
import { JokesService, Joke } from '../jokes.service';

@Component({
  selector: 'app-joke-display',
  templateUrl: './joke-display.component.html',
  styleUrls: ['./joke-display.component.css'],
})

export class JokeDisplayComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ['rank', 'term', 'count'];
  showList = false;

  constructor(private jokesService: JokesService) {}

  public getJokes(): void {
    this.showList = true;
    this.jokesService.getJokes().subscribe((data: Joke) => {
      if (data.status === 200) {
        this.dataSource = data.results;
      }
    });
  }

  ngOnInit(): void {}
}
