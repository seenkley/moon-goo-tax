import { Component, OnInit } from '@angular/core';
import { MarketFetcherService } from '../market-fetcher.service';
import { MarketData } from '../market-data';

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})
export class ResponseViewerComponent implements OnInit {

  marketData = {}

  constructor(private marketFetcher: MarketFetcherService) {
    this.marketData = this.marketFetcher.getMarketData().subscribe((marketData: MarketData[]) =>
      console.log(marketData)
    );
  }



  ngOnInit(): void {

  }

  getData() {
      return this.marketData;
  }

}
