import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../../shared/poke-api/models/pokemon-details-response';
import { OwnListStore } from './ownlist.store';
import { OwnListQuery } from './ownlist.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CaughtListService {
  constructor(
    private readonly store: OwnListStore,
    private readonly query: OwnListQuery
  ) {}

  isCaught(name: string): Observable<boolean> {
    return this.query.selectEntity(name).pipe(map((value) => value != null));
  }

  addPokemon(pokemon: PokemonDetailsResponse): void {
    this.store.add(pokemon);
  }
}
