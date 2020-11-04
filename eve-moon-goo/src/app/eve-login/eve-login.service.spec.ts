import { TestBed } from '@angular/core/testing';

import { EveLoginService } from './eve-login.service';

describe('EveLoginService', () => {
  let service: EveLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EveLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
