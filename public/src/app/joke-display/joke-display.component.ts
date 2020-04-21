
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
  isDisabled = false;
  showEmpty = false;

  constructor(private jokesService: JokesService) {}

  public getJokes(): void {
    this.showList = true;
    this.isDisabled = true;
    this.jokesService.getJokes().subscribe((data: Joke) => {
      if (data.status === 200) {
        this.isDisabled = false;
        this.dataSource = data.results;
        if (this.dataSource.length === 0){
          this.showEmpty = true;
        }
      }
      if (data.status === 500) {
        this.showList = false;
        this.showEmpty = true;
        this.isDisabled = false;
      }
    });
  }

  ngOnInit(): void {}
}
