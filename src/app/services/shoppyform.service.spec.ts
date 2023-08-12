import { TestBed } from '@angular/core/testing';

import { ShoppyformService } from './shoppyform.service';

describe('ShoppyformService', () => {
  let service: ShoppyformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppyformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
