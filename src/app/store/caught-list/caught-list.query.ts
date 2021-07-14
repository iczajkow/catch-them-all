import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OwnListState, CaughtListStore } from './caught-list.store';

@Injectable({ providedIn: 'root' })
export class CaughtListQuery extends QueryEntity<OwnListState> {
  constructor(protected store: CaughtListStore) {
    super(store);
  }
}
