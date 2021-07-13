import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PokemonsStore, PokemonsState } from './pokemons.store';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonsQuery extends QueryEntity<PokemonsState> {
  constructor(protected store: PokemonsStore) {
    super(store);
  }

  selectPageSize(): Observable<number> {
    return this.select('pageSize');
  }

  selectPageIndex(): Observable<number> {
    return this.select('pageIndex');
  }

  selectQuery(): Observable<string> {
    return this.select('query');
  }
}
