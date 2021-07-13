import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../../shared/poke-api/models/pokemon-details-response';

export interface OwnListState extends EntityState<PokemonDetailsResponse> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ownlist', idKey: 'name' })
export class OwnListStore extends EntityStore<OwnListState> {
  constructor() {
    super();
  }
}
