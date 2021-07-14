import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PokemonListItemResponse } from '../../shared/poke-api/models/pokemon-list-response';

export type ListMode = 'all' | 'caught' | 'wishList';

export interface PokemonsState extends EntityState<PokemonListItemResponse> {
  pageSize: number;
  pageIndex: number;
  query: string;
  listMode: ListMode;
}

@Injectable()
@StoreConfig({ name: 'pokemons', idKey: 'name' })
export class PokemonsStore extends EntityStore<PokemonsState> {
  constructor() {
    super({ pageSize: 10, pageIndex: 0, listMode: 'all' });
  }
}
