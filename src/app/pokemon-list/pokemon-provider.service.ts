import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonListItemResponse } from '../shared/poke-api/models/pokemon-list-response';
import { PokemonApiService } from '../shared/poke-api/pokemon-api.service';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

@Injectable()
export class PokemonProviderService {
  constructor(private readonly pokemonApiService: PokemonApiService) {}

  //This is needed as pokemon api does not provide search we need to fetch all
  //https://github.com/PokeAPI/pokeapi/issues/47
  getAllPokemons(): Observable<PokemonListItemResponse[]> {
    return this.pokemonApiService.getList(0, 0).pipe(
      switchMap(({ count }) => {
        return this.pokemonApiService.getList(count, 0);
      }),
      pluck('results'),
      shareReplay(1) //Cache
    );
  }
}
