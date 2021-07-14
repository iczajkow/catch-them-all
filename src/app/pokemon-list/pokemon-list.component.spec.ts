import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListService } from './pokemon-list.service';
import { EMPTY } from 'rxjs';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        {
          provide: PokemonListService,
          useValue: {
            selectPokemons: () => EMPTY,
            selectPokemonsCount: () => EMPTY,
            selectPageSize: () => EMPTY,
            selectPageIndex: () => EMPTY,
            selectQuery: () => EMPTY,
            selectMode: () => EMPTY,
            fetchPokemons: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
