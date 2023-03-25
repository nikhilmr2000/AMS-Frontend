import { TestBed } from '@angular/core/testing';

import { AddclassService } from './addclass.service';

describe('AddclassService', () => {
  let service: AddclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
