import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { PokemonDetailsResponse } from '../shared/poke-api/models/pokemon-details-response';
import { PokemonWishListService } from '../store/wishlist/pokemon-wish-list.service';
import { CaughtListService } from '../store/ownlist/caught-list.service';

@Component({
  selector: 'cta-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  pokemon$: Observable<PokemonDetailsResponse | null>;
  hasInWishList$: Observable<boolean>;
  showCatchButton$: Observable<boolean>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly pokemonWishListService: PokemonWishListService,
    private readonly caughtListService: CaughtListService
  ) {
    this.pokemon$ = this.activatedRoute.data.pipe(pluck('pokemon'));
    this.hasInWishList$ = this.pokemon$.pipe(
      switchMap((pokemon) =>
        this.pokemonWishListService.selectHasInWishList(pokemon!.name)
      )
    );

    this.showCatchButton$ = this.pokemon$.pipe(
      switchMap((pokemon) => this.caughtListService.isCaught(pokemon!.name)),
      map((value) => !value)
    );
  }

  onToggleWishListClicked(pokemon: PokemonDetailsResponse) {
    this.pokemonWishListService.toggleWishList(pokemon);
  }

  onSetAsCaughtClicked(pokemon: PokemonDetailsResponse) {
    this.caughtListService.addPokemon(pokemon);
  }
}
