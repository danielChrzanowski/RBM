import { TestBed } from '@angular/core/testing';

import { UzytkownikServiceService } from './uzytkownik-service.service';

describe('UzytkownikServiceService', () => {
  let service: UzytkownikServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UzytkownikServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
