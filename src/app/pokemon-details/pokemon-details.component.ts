import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { PokemonDetailsResponse } from '../shared/poke-api/models/pokemon-details-response';

@Component({
  selector: 'cta-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Observable<PokemonDetailsResponse | null>;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.pokemon$ = this.activatedRoute.data.pipe(pluck('pokemon'));
  }

  ngOnInit(): void {}
}
