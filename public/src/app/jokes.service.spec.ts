import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { JokesService, Joke } from './jokes.service';

describe('JokesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService],
    });
  });

  it('should get jokes', inject(
    [HttpTestingController, JokesService],
    (httpMock: HttpTestingController, jokesService: JokesService) => {
      const mockJokes = {
        results: [
          { rank: 1, term: 'a', count: 14 },
          { rank: 2, term: 'you', count: 9 },
          { rank: 3, term: 'do', count: 7 },
          { rank: 4, term: 'what', count: 7 },
          { rank: 5, term: 'the', count: 4 },
          { rank: 6, term: 'to', count: 4 },
          { rank: 7, term: 'call', count: 3 },
          { rank: 8, term: 'i', count: 3 },
          { rank: 9, term: 'and', count: 2 },
          { rank: 10, term: 'in', count: 2 }],
        status: 200
      };

      // tslint:disable-next-line:no-shadowed-variable
      jokesService.getJokes().subscribe((data: Joke) => {
        expect(data.status).toBe(200);
        expect(data.results.length).toBe(10);
      });

      const mockReq = httpMock.expectOne(jokesService.API_SERVER);

      // expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(mockJokes);

      httpMock.verify();

    }
  ));

  it('should return empty list when there is no joke', inject(
    [HttpTestingController, JokesService],
    (httpMock: HttpTestingController, jokesService: JokesService) => {
      const mockJokes = {
        results: [],
        status: 200,
      };

      // tslint:disable-next-line:no-shadowed-variable
      jokesService.getJokes().subscribe((data: Joke) => {
        expect(data.status).toBe(200);
        expect(data.results.length).toBe(0);
      });

      const mockReq = httpMock.expectOne(jokesService.API_SERVER);

      // expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(mockJokes);

      httpMock.verify();
    }
  ));
});
