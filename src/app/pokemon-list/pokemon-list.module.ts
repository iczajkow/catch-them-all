import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListService } from './pokemon-list.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemonsStore } from './store/pokemons.store';
import { PokemonProviderService } from './pokemon-provider.service';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [PokemonListService, PokemonsStore, PokemonProviderService],
})
export class PokemonListModule {}
