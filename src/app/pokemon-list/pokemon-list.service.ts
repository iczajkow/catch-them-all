import { Injectable } from '@angular/core';
import { PokemonsStore } from './store/pokemons.store';
import { PokemonProviderService } from './pokemon-provider.service';
import { Observable } from 'rxjs';
import { PokemonListItemResponse } from '../shared/poke-api/models/pokemon-list-response';
import { PokemonsQuery } from './store/pokemons.query';
import { PageEvent } from '@angular/material/paginator';
import { combineQueries } from '@datorama/akita';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonListService {
  constructor(
    private readonly pokemonsStore: PokemonsStore,
    private readonly pokemonsQuery: PokemonsQuery,
    private readonly pokemonProviderService: PokemonProviderService
  ) {}

  fetchPokemons(): void {
    this.pokemonProviderService.getAllPokemons().subscribe((pokemons) => {
      this.pokemonsStore.set(pokemons);
    });
  }

  handlePageChange({ pageIndex, pageSize }: PageEvent) {
    this.pokemonsStore.update({ pageIndex, pageSize });
  }

  selectPokemons(): Observable<PokemonListItemResponse[]> {
    return combineQueries([
      this.pokemonsQuery.selectAll(),
      this.pokemonsQuery.selectPageIndex(),
      this.pokemonsQuery.selectPageSize(),
    ]).pipe(
      map(([pokemons, pageIndex, pageSize]) => {
        const from = pageSize * pageIndex;
        const to = from + pageSize;
        return pokemons.slice(from, to);
      })
    );
  }

  selectPokemonsCount(): Observable<number> {
    return this.pokemonsQuery.selectCount();
  }

  selectPageSize(): Observable<number> {
    return this.pokemonsQuery.selectPageSize();
  }

  selectPageIndex(): Observable<number> {
    return this.pokemonsQuery.selectPageIndex();
  }
}
