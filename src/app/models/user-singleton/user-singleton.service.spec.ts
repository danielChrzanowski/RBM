import { TestBed } from '@angular/core/testing';

import { UserSingleton } from './user-singleton.service';

describe('LoggedUserService', () => {
  let service: UserSingleton;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSingleton);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
