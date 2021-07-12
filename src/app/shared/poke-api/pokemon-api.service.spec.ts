import { inject, TestBed } from '@angular/core/testing';
import { PokemonApiService } from './pokemon-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { POKE_API_CONFIG } from './poke-api.config';

describe('PokemonApiService', () => {
  let service: PokemonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonApiService,
        { provide: POKE_API_CONFIG, useValue: { url: 'https://api/' } },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call <api>/pokemon endpoint with specified query params', inject(
    [HttpTestingController],
    (httpTestingController: HttpTestingController) => {
      service.getList(100, 200).subscribe();
      httpTestingController.expectOne({
        method: 'GET',
        url: 'https://api/pokemon?limit=100&offset=200',
      });
    }
  ));
});
