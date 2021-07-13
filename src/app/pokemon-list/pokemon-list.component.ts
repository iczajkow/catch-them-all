import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { Observable } from 'rxjs';
import { PokemonListItemResponse } from '../shared/poke-api/models/pokemon-list-response';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'cta-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<PokemonListItemResponse[]>;
  pokemonsCount$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;

  constructor(private readonly pokemonListService: PokemonListService) {
    this.pokemons$ = this.pokemonListService.selectPokemons();
    this.pokemonsCount$ = this.pokemonListService.selectPokemonsCount();
    this.pageSize$ = this.pokemonListService.selectPageSize();
    this.pageIndex$ = this.pokemonListService.selectPageIndex();
  }

  ngOnInit() {
    this.pokemonListService.fetchPokemons();
  }

  onPageChange(event: PageEvent) {
    this.pokemonListService.handlePageChange(event);
  }
}
