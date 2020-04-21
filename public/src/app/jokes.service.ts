import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface JokeServerResponse {
  status: number;
  results: any[];
}

@Injectable({
  providedIn: 'root',
})

export class JokesService {
  API_SERVER = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}

  // Return "response" from the API. If an error happens,
  // return an empty object.
  public getJokes() {
    return this.httpClient.get<JokeServerResponse>(this.API_SERVER).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => of({}))
    );
  }
}
