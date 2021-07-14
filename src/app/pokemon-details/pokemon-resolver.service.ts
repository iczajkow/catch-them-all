import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PokemonDetailsResponse } from '../shared/poke-api/models/pokemon-details-response';
import { Observable, of } from 'rxjs';
import { PokemonApiService } from '../shared/poke-api/pokemon-api.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PokemonResolverService
  implements Resolve<PokemonDetailsResponse | null>
{
  constructor(
    private readonly pokemonApiService: PokemonApiService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<PokemonDetailsResponse | null> {
    const idOrName = route.paramMap.get('id');
    if (!idOrName) {
      this.router.navigate(['/pageNotFound']);
      return of(null);
    }
    return this.pokemonApiService.getOne(idOrName).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.router.navigate(['/pageNotFound']);
          return of(null);
        }
        this.router.navigate(['/list']);
        throw error;
      })
    );
  }
}
