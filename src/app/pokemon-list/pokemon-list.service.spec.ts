import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { PokemonListService } from './pokemon-list.service';
import { PokemonProviderService } from './pokemon-provider.service';
import { PokemonsQuery } from './store/pokemons.query';
import { PokemonsStore } from './store/pokemons.store';
import { CaughtListStore } from '../store/caught-list/caught-list.store';
import { WishListStore } from '../store/wish-list/wishlist.store';

describe('PokemonListService', () => {
  let service: PokemonListService;

  const generatePokemonList = (length: number, start = 0) =>
    Array.from({ length }).map((_, index) => ({
      name: (index + start).toString(),
      url: '',
    }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonListService,
        PokemonsStore,
        PokemonsQuery,
        { provide: PokemonProviderService, useValue: {} },
      ],
    });
    service = TestBed.inject(PokemonListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should paginate list of pokemons', inject(
    [PokemonsStore],
    fakeAsync((store: PokemonsStore) => {
      store.set(generatePokemonList(100));
      const spy = jasmine.createSpy();
      service.selectPokemons().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith(generatePokemonList(10));
      tick();
      service.handlePageChange({ pageIndex: 2, pageSize: 20 } as any);
      tick();
      expect(spy).toHaveBeenCalledWith(generatePokemonList(20, 40));
    })
  ));

  it('should filter list of pokemons', inject(
    [PokemonsStore],
    fakeAsync((store: PokemonsStore) => {
      store.set(generatePokemonList(10));
      const spy = jasmine.createSpy();
      service.selectPokemons().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith(generatePokemonList(10));
      tick();
      service.handleFilterChange('1');
      tick();
      expect(spy).toHaveBeenCalledWith(generatePokemonList(1, 1));
    })
  ));

  it('should return count of currently filtered pokemons', inject(
    [PokemonsStore],
    fakeAsync((store: PokemonsStore) => {
      store.set(generatePokemonList(10));
      service.handleFilterChange('1');
      const spy = jasmine.createSpy();
      service.selectPokemonsCount().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith(1);
    })
  ));

  it('should return count of all pokemons', inject(
    [PokemonsStore],
    fakeAsync((store: PokemonsStore) => {
      store.set(generatePokemonList(10));
      const spy = jasmine.createSpy();
      service.selectPokemonsCount().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith(10);
    })
  ));

  it('should return all caught pokemons', inject(
    [PokemonsStore, CaughtListStore],
    fakeAsync((store: PokemonsStore, caughtListStore: CaughtListStore) => {
      store.set(generatePokemonList(10));
      caughtListStore.set([{ name: '4' }, { name: '5' }] as any);
      store.update({ listMode: 'caught' });
      const spy = jasmine.createSpy();
      service.selectPokemons().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith([
        { name: '4', url: '' },
        { name: '5', url: '' },
      ]);
    })
  ));

  it('should return all wishlist pokemons', inject(
    [PokemonsStore, WishListStore],
    fakeAsync((store: PokemonsStore, wishListStore: WishListStore) => {
      store.set(generatePokemonList(10));
      wishListStore.set([{ name: '1' }] as any);
      store.update({ listMode: 'wishList' });
      const spy = jasmine.createSpy();
      service.selectPokemons().subscribe(spy);
      tick();
      expect(spy).toHaveBeenCalledWith([
        { name: '1', url: '' },
      ]);
    })
  ));
});
