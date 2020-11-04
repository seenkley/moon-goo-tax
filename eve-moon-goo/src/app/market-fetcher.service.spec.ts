import { TestBed } from '@angular/core/testing';

import { MarketFetcherService } from './market-fetcher.service';

describe('MarketFetcherService', () => {
  let service: MarketFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
