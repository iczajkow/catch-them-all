import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OwnListState, OwnListStore } from './ownlist.store';

@Injectable({ providedIn: 'root' })
export class OwnListQuery extends QueryEntity<OwnListState> {
  constructor(protected store: OwnListStore) {
    super(store);
  }
}
