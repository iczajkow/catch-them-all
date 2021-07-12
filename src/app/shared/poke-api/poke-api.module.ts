import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POKE_API_CONFIG, PokeApiConfig } from './poke-api.config';
import { PokemonApiService } from './pokemon-api.service';

@NgModule({
  imports: [CommonModule],
})
export class PokeApiModule {
  static withConfig(config: PokeApiConfig): ModuleWithProviders<PokeApiModule> {
    return {
      ngModule: PokeApiModule,
      providers: [
        { provide: POKE_API_CONFIG, useValue: config },
        PokemonApiService,
      ],
    };
  }
}
