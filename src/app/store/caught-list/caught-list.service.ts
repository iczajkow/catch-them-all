import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../../shared/poke-api/models/pokemon-details-response';
import { CaughtListStore } from './caught-list.store';
import { CaughtListQuery } from './caught-list.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CaughtListService {
  constructor(
    private readonly store: CaughtListStore,
    private readonly query: CaughtListQuery
  ) {}

  isCaughtSync(name: string): boolean {
    return this.query.hasEntity(name);
  }

  isCaught(name: string): Observable<boolean> {
    return this.query.selectEntity(name).pipe(map((value) => value != null));
  }

  addPokemon(pokemon: PokemonDetailsResponse): void {
    this.store.add(pokemon);
  }
}
