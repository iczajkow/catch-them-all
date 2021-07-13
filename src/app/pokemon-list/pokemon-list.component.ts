import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'cta-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonListComponent implements OnInit {

  constructor(private readonly pokemonListService: PokemonListService) {
  }

  ngOnInit() {
    this.pokemonListService.fetchPokemons();
  }
}
