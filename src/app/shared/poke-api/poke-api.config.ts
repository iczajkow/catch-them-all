import { InjectionToken } from '@angular/core';

export const POKE_API_CONFIG = new InjectionToken('POKE_API_CONFIG');

export interface PokeApiConfig {
  url: string;
}
