import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { POKE_API_CONFIG, PokeApiConfig } from './poke-api.config';
import { Observable } from 'rxjs';
import { PokemonListResponse } from './models/pokemon-list-response';

@Injectable()
export class PokemonApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(POKE_API_CONFIG) private readonly config: PokeApiConfig
  ) {}

  getList(limit: number, offset: number): Observable<PokemonListResponse> {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<PokemonListResponse>(`${this.config.url}pokemon`, {
      params,
    });
  }
}
