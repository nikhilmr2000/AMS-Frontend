import { TestBed } from '@angular/core/testing';

import { ClassdisplayService } from './classdisplay.service';

describe('ClassdisplayService', () => {
  let service: ClassdisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassdisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
