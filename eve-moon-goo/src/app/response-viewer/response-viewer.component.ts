import { Component, OnInit } from '@angular/core';
import { MarketFetcherService } from '../market-fetcher.service';
import { MarketData } from '../market-data';
import { RefinedMoonOre } from '../interfaces/refined-moon-ore'
import { ObjectUnsubscribedError } from 'rxjs';
import { RefinedMoonOreNames } from '../interfaces/refined-moon-ore-names'
import { MoonOreDetailFetcherService } from './moon-ore-detail-fetcher.service'

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})
export class ResponseViewerComponent implements OnInit {


  moonOreNames = [];

  constructor(private moonOreDetailFetcherService: MoonOreDetailFetcherService,
    private marketFetcher: MarketFetcherService) {

  }

  ngOnInit() {
    this.moonOreNames = this.moonOreDetailFetcherService.getDetails();
  }

  getMoonOreNames(): RefinedMoonOreNames[] {
    return this.moonOreNames;
  }

}