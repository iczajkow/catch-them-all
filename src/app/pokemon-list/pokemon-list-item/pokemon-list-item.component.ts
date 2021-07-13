import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PokemonListItemResponse } from '../../shared/poke-api/models/pokemon-list-response';

@Component({
  selector: 'cta-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListItemComponent {
  private _pokemon: PokemonListItemResponse | null = null;

  private pokemonName = '';

  @Input() set pokemon(value: PokemonListItemResponse) {
    this._pokemon = value;
    this.pokemonName = value.name;
  }

  get displayName(): string {
    return this.pokemonName
      .split('')
      .map((char, index) => {
        if (index === 0) {
          return char.toUpperCase();
        }
        return char;
      })
      .join('');
  }
}
