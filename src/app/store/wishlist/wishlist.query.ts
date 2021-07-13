import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WishListState, WishListStore } from './wishlist.store';

@Injectable({ providedIn: 'root' })
export class WishListQuery extends QueryEntity<WishListState> {
  constructor(protected store: WishListStore) {
    super(store);
  }
}
