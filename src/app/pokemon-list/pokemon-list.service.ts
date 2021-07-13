import { Injectable } from '@angular/core';
import { PokemonsStore } from './store/pokemons.store';
import { PokemonProviderService } from './pokemon-provider.service';

@Injectable()
export class PokemonListService {
  constructor(
    private readonly pokemonsStore: PokemonsStore,
    private readonly pokemonProviderService: PokemonProviderService
  ) {}

  fetchPokemons(): void {
    this.pokemonProviderService.getAllPokemons().subscribe((pokemons) => {
      this.pokemonsStore.set(pokemons);
    });
  }
}
