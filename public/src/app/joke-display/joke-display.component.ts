
import { Component } from '@angular/core';
import { JokesService, JokeServerResponse } from '../jokes.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-joke-display',
  templateUrl: './joke-display.component.html',
  styleUrls: ['./joke-display.component.css'],
})
export class JokeDisplayComponent {
  dataSource = [];
  displayedColumns: string[] = ['rank', 'term', 'count'];
  showList = false;
  isDisabled = false;
  showError = false;

  constructor(private jokesService: JokesService) {}

  public getJokes(): void {
    this.isDisabled = true;
    this.jokesService.getJokes().subscribe(
      (data: JokeServerResponse) => {
        this.isDisabled = false;
        if (Object.entries(data).length === 0) {
          this.showError = true;
          this.showList = false;
        } else {
          this.dataSource = data.results;
          this.showList = true;
        }
      },
      (error: any) => console.log('nothing happens here, handled already')
    );
  }
}
