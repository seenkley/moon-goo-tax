import { TestBed } from '@angular/core/testing';

import { MoonOreDetailFetcherService } from './moon-ore-detail-fetcher.service';

describe('MoonOreDetailFetcherService', () => {
  let service: MoonOreDetailFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonOreDetailFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
