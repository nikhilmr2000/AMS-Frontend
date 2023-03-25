import { TestBed } from '@angular/core/testing';

import { ProfilestatusService } from './profilestatus.service';

describe('ProfilestatusService', () => {
  let service: ProfilestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
