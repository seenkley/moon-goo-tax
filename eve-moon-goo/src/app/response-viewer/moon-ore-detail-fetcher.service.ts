import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MarketFetcherService } from '../market-fetcher.service';
import { MarketData } from '../market-data';
import { RefinedMoonOre } from '../interfaces/refined-moon-ore'
import { ObjectUnsubscribedError } from 'rxjs';
import { RefinedMoonOreNames } from '../interfaces/refined-moon-ore-names'

@Injectable({
  providedIn: 'root'
})
export class MoonOreDetailFetcherService {

  refinedMoonOreIds = [];
  moonOreNames = [];
  marketData = [];

  calls = 1;

  constructor(private marketFetcher: MarketFetcherService) {
    this.init();
  }

  init() {
    this.marketFetcher.getMoonMatIds().subscribe((refinedMoonOreList: RefinedMoonOre) => {
      this.refinedMoonOreIds = refinedMoonOreList.types;

      this.marketFetcher.getMoonMatNames(this.refinedMoonOreIds).subscribe((data: RefinedMoonOreNames[]) => {
        data.forEach((entry: RefinedMoonOreNames) => {

          this.marketFetcher.getMarketData(entry.id.toString()).subscribe((marketData: MarketData[]) => {
      
            Object.keys(marketData).forEach(index => {
              entry.price = marketData[index].buy.max;
            });
          });

          this.moonOreNames.push(entry);
        })
      });
    });
  }

  getDetails(): RefinedMoonOreNames[] {
    return this.moonOreNames;
  }
}
