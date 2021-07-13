import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';
import { PokemonDetailsComponent } from './pokemon-details.component';


@NgModule({
  declarations: [
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule
  ]
})
export class PokemonDetailsModule { }
