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

  handleFilterChange(query: string) {
    this.pokemonsStore.update({ query, pageIndex: 0 });
  }

  selectPokemons(): Observable<PokemonListItemResponse[]> {
    return combineQueries([
      this.pokemonsQuery.selectAll(),
      this.pokemonsQuery.selectPageIndex(),
      this.pokemonsQuery.selectPageSize(),
      this.pokemonsQuery.selectQuery(),
    ]).pipe(
      map(([pokemons, pageIndex, pageSize, query]) => {
        const from = pageSize * pageIndex;
        const to = from + pageSize;
        if (!query) {
          return pokemons.slice(from, to);
        }
        return this.filterPokemons(pokemons, query).slice(from, to);
      })
    );
  }

  selectPokemonsCount(): Observable<number> {
    return combineQueries([
      this.pokemonsQuery.selectAll(),
      this.pokemonsQuery.selectQuery(),
    ]).pipe(
      map(([pokemons, query]) => {
        if (!query) {
          return pokemons.length;
        }
        return this.filterPokemons(pokemons, query).length;
      })
    );
  }

  selectPageSize(): Observable<number> {
    return this.pokemonsQuery.selectPageSize();
  }

  selectPageIndex(): Observable<number> {
    return this.pokemonsQuery.selectPageIndex();
  }

  private filterPokemons(pokemons: PokemonListItemResponse[], query: string) {
    return pokemons.filter((pokemon) =>
      pokemon.name.includes(query.toLowerCase())
    );
  }
}
