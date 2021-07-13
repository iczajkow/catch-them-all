import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PokemonsStore, PokemonsState } from './pokemons.store';

@Injectable({ providedIn: 'root' })
export class PokemonsQuery extends QueryEntity<PokemonsState> {

  constructor(protected store: PokemonsStore) {
    super(store);
  }

}
