import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../../shared/poke-api/models/pokemon-details-response';

export interface WishListState extends EntityState<PokemonDetailsResponse> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wishlist', idKey: 'name' })
export class WishListStore extends EntityStore<WishListState> {
  constructor() {
    super();
  }
}
