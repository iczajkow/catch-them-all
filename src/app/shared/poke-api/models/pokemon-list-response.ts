export interface PokemonListResponse {
  count: number;
  next: string;
  previous: number;
  results: PokemonListItemResponse[];
}

export interface PokemonListItemResponse {
  name: string;
  url: string;
}
