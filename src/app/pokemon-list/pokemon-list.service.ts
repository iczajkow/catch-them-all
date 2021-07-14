import { Injectable } from '@angular/core';
import { ListMode, PokemonsStore } from './store/pokemons.store';
import { PokemonProviderService } from './pokemon-provider.service';
import { Observable } from 'rxjs';
import { PokemonListItemResponse } from '../shared/poke-api/models/pokemon-list-response';
import { PokemonsQuery } from './store/pokemons.query';
import { PageEvent } from '@angular/material/paginator';
import { combineQueries } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { CaughtListService } from '../store/caught-list/caught-list.service';
import { PokemonWishListService } from '../store/wish-list/pokemon-wish-list.service';

@Injectable()
export class PokemonListService {
  constructor(
    private readonly pokemonsStore: PokemonsStore,
    private readonly pokemonsQuery: PokemonsQuery,
    private readonly pokemonProviderService: PokemonProviderService,
    private readonly caughtListService: CaughtListService,
    private readonly pokemonWishListService: PokemonWishListService
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

  handleModeChange(listMode: ListMode) {
    this.pokemonsStore.update({ listMode, pageIndex: 0 });
  }

  selectPokemons(): Observable<PokemonListItemResponse[]> {
    return combineQueries([
      this.pokemonsQuery.selectAll(),
      this.pokemonsQuery.selectPageIndex(),
      this.pokemonsQuery.selectPageSize(),
      this.pokemonsQuery.selectQuery(),
      this.pokemonsQuery.selectMode(),
    ]).pipe(
      map(([pokemons, pageIndex, pageSize, query, mode]) => {
        const from = pageSize * pageIndex;
        const to = from + pageSize;
        return this.filterPokemons(pokemons, query, mode).slice(from, to);
      })
    );
  }

  selectPokemonsCount(): Observable<number> {
    return combineQueries([
      this.pokemonsQuery.selectAll(),
      this.pokemonsQuery.selectQuery(),
      this.pokemonsQuery.selectMode(),
    ]).pipe(
      map(([pokemons, query, mode]) => {
        return this.filterPokemons(pokemons, query, mode).length;
      })
    );
  }

  selectPageSize(): Observable<number> {
    return this.pokemonsQuery.selectPageSize();
  }

  selectPageIndex(): Observable<number> {
    return this.pokemonsQuery.selectPageIndex();
  }

  selectQuery(): Observable<string> {
    return this.pokemonsQuery.selectQuery();
  }

  selectMode(): Observable<ListMode> {
    return this.pokemonsQuery.selectMode();
  }

  private filterPokemons(
    pokemons: PokemonListItemResponse[],
    query: string,
    mode: ListMode
  ) {
    const modeFilter = (pokemon: PokemonListItemResponse) => {
      switch (mode) {
        case 'caught':
          return this.caughtListService.isCaughtSync(pokemon.name);
        case 'wishList':
          return this.pokemonWishListService.isInWishListSync(pokemon.name);
        default:
          return true;
      }
    };

    return pokemons.filter((pokemon) => {
      if (!query) {
        return modeFilter(pokemon);
      }
      return pokemon.name.includes(query.toLowerCase()) && modeFilter(pokemon);
    });
  }
}
