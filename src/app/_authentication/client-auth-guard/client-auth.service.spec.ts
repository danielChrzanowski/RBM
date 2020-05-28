import { TestBed } from '@angular/core/testing';
import { ClientAuthGuardService } from './client-auth.service';

describe('AuthService', () => {
  let service: ClientAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
