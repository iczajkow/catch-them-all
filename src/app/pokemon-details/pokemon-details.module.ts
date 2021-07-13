import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonResolverService } from './pokemon-resolver.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PokemonDetailsComponent,
    PokemonStatsComponent
  ],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [PokemonResolverService]
})
export class PokemonDetailsModule { }
