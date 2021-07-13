import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PokemonListItemResponse } from '../../shared/poke-api/models/pokemon-list-response';

export interface PokemonsState extends EntityState<PokemonListItemResponse> {}

@Injectable()
@StoreConfig({ name: 'pokemons', idKey: 'name' })
export class PokemonsStore extends EntityStore<PokemonsState> {
  constructor() {
    super();
  }
}
