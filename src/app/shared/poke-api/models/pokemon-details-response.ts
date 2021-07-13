export interface PokemonDetailsResponse {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: { name: string }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: true;
  location_area_encounters: string;
  name: string;
  order: number;
  past_types: [];
  sprites: {
    back_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: PokemonStat[];
  types: any[];
  weight: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: false;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
