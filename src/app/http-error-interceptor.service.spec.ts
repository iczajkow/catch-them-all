import { inject, TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('HttpErrorInterceptorService', () => {
  let service: HttpErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(HttpErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snack bar on error', inject(
    [MatSnackBar],
    (snackBar: MatSnackBar) => {
      snackBar.open = jasmine.createSpy('open');
      service
        .intercept(null as any, {
          handle: () => throwError(new HttpErrorResponse({ status: 500 })),
        })
        .subscribe({ error: () => {} });
      expect(snackBar.open).toHaveBeenCalled();
    }
  ));
});
