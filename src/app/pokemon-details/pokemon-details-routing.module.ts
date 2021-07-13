import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonResolverService } from './pokemon-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: PokemonDetailsComponent,
    resolve: {
      pokemon: PokemonResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDetailsRoutingModule {}
