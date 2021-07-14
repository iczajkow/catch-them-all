import { TestBed } from '@angular/core/testing';

import { PokemonWishListService } from './pokemon-wish-list.service';

describe('PokemonWishListService', () => {
  let service: PokemonWishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonWishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
