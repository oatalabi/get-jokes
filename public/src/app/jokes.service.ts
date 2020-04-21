import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Joke {
  status: any;
  results: any;
}

@Injectable({
  providedIn: 'root',
})

export class JokesService {
  API_SERVER = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}

  public getJokes(){
    return this.httpClient.get<Joke>(this.API_SERVER);
  }
}
