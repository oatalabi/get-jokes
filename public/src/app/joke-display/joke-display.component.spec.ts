import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { JokeDisplayComponent } from './joke-display.component';
import { JokesService, Joke } from '../jokes.service';

describe('JokeDisplayComponent', () => {
  let component: JokeDisplayComponent;
  let fixture: ComponentFixture<JokeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JokeDisplayComponent],
      imports: [HttpClientModule],
      providers: [JokesService],
    }).compileComponents();
  }));

  it('should render button of the project', () => {
    // tslint:disable-next-line:no-shadowed-variable
    const fixture = TestBed.createComponent(JokeDisplayComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.getJokeButton').textContent).toContain(
      'Get Me Counts'
    );
  });
});
