import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListService } from './pokemon-list.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemonsStore } from './store/pokemons.store';
import { PokemonProviderService } from './pokemon-provider.service';
import { PokemonsQuery } from './store/pokemons.query';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PokemonListItemComponent } from './pokemon-list-item/pokemon-list-item.component';

@NgModule({
  declarations: [PokemonListComponent, PokemonListItemComponent],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    PokemonListService,
    PokemonsStore,
    PokemonsQuery,
    PokemonProviderService,
  ],
})
export class PokemonListModule {}
