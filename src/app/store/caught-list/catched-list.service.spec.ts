import { TestBed } from '@angular/core/testing';

import { CaughtListService } from './caught-list.service';

describe('CatchedListService', () => {
  let service: CaughtListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaughtListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
