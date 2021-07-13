import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { Observable, Subject } from 'rxjs';
import { PokemonListItemResponse } from '../shared/poke-api/models/pokemon-list-response';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { fakeAsync } from '@angular/core/testing';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cta-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons$: Observable<PokemonListItemResponse[]>;
  pokemonsCount$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;

  filter: FormControl;

  private readonly destroy$: Subject<void>;

  constructor(private readonly pokemonListService: PokemonListService) {
    this.filter = new FormControl();
    this.destroy$ = new Subject();

    this.pokemons$ = this.pokemonListService.selectPokemons();
    this.pokemonsCount$ = this.pokemonListService.selectPokemonsCount();
    this.pageSize$ = this.pokemonListService.selectPageSize();
    this.pageIndex$ = this.pokemonListService.selectPageIndex();
  }

  ngOnInit() {
    this.filter.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(250))
      .subscribe((value) => {
        this.pokemonListService.handleFilterChange(value);
      });

    this.pokemonListService
      .selectQuery()
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) => this.filter.setValue(value, { emitEvent: false }));

    this.pokemonListService.fetchPokemons();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(event: PageEvent) {
    this.pokemonListService.handlePageChange(event);
  }
}
