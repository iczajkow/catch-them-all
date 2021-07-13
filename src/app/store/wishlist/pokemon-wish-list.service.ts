import { Injectable } from '@angular/core';
import { WishListStore } from './wishlist.store';
import { PokemonDetailsResponse } from '../../shared/poke-api/models/pokemon-details-response';
import { Observable } from 'rxjs';
import { WishListQuery } from './wishlist.query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonWishListService {
  constructor(
    private readonly wishListStore: WishListStore,
    private readonly wishListQuery: WishListQuery
  ) {}

  selectHasInWishList(name: string): Observable<boolean> {
    return this.wishListQuery
      .selectEntity(name)
      .pipe(map((value) => value != null));
  }

  toggleWishList(pokemon: PokemonDetailsResponse): void {
    if (this.wishListQuery.hasEntity(pokemon.name)) {
      this.wishListStore.remove(pokemon.name);
    } else {
      this.wishListStore.add(pokemon);
    }
  }
}
