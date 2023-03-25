import { TestBed } from '@angular/core/testing';

import { UpdateclassService } from './updateclass.service';

describe('UpdateclassService', () => {
  let service: UpdateclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
