import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { PokemonResolverService } from './pokemon-resolver.service';
import { PokemonApiService } from '../shared/poke-api/pokemon-api.service';
import { convertToParamMap, Router } from '@angular/router';
import { EMPTY, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('PokemonResolverService', () => {
  let service: PokemonResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonResolverService,
        { provide: PokemonApiService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    });
    service = TestBed.inject(PokemonResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to not found if id is not provided', inject(
    [Router],
    (router: Router) => {
      router.navigate = jasmine.createSpy('navigate');
      service.resolve({ paramMap: convertToParamMap({}) } as any);
      expect(router.navigate).toHaveBeenCalledWith(['/pageNotFound']);
    }
  ));

  it('should call api with id from param', inject(
    [Router, PokemonApiService],
    (router: Router, pokemonApiService: PokemonApiService) => {
      pokemonApiService.getOne = jasmine.createSpy().and.returnValue(EMPTY);
      service.resolve({ paramMap: convertToParamMap({ id: 'test' }) } as any);
      expect(pokemonApiService.getOne).toHaveBeenCalledWith('test');
    }
  ));

  it('should redirect to pageNotFound if pokemon does not exists', inject(
    [Router, PokemonApiService],
    fakeAsync((router: Router, pokemonApiService: PokemonApiService) => {
      router.navigate = jasmine.createSpy('navigate');
      pokemonApiService.getOne = () => throwError(new HttpErrorResponse({status: 404}));
      service.resolve({ paramMap: convertToParamMap({ id: 'test' }) } as any).subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/pageNotFound']);
    }
  )));
});
