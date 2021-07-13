import { inject, TestBed } from '@angular/core/testing';

import { PokemonProviderService } from './pokemon-provider.service';
import { PokemonApiService } from '../shared/poke-api/pokemon-api.service';
import { of } from 'rxjs';

describe('PokemonProviderService', () => {
  let service: PokemonProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonProviderService,
        { provide: PokemonApiService, useValue: {} },
      ],
    });
    service = TestBed.inject(PokemonProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pokemons', inject(
    [PokemonApiService],
    (pokemonApiService: PokemonApiService) => {
      pokemonApiService.getList = jasmine
        .createSpy('getList')
        .and.returnValue(of({ count: 1000, results: [] }));

      service.getAllPokemons().subscribe();
      expect(pokemonApiService.getList).toHaveBeenCalledWith(1000, 0);
    }
  ));
});
