import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarketData } from './market-data';
import { Observable } from 'rxjs';


// {
//   "34": {
//     "buy": {
//       "weightedAverage": "4.02878502065",
//       "max": "5.95",
//       "min": "0.01",
//       "stddev": "1.62036217159",
//       "median": "5.0",
//       "volume": "10024734026.0",
//       "orderCount": "52",
//       "percentile": "5.50168617928"
//     },
//     "sell": {
//       "weightedAverage": "6.60015441538",
//       "max": "2201571.0",
//       "min": "5.01",
//       "stddev": "177420.733866",
//       "median": "6.38",
//       "volume": "25573930856.0",
//       "orderCount": "179",
//       "percentile": "5.92257900667"
//     }
//   }


interface fuzzworksResponse {
  id: String;

}

@Injectable({
  providedIn: 'root'
})
export class MarketFetcherService {

  fuzzworkUrl = 'https://market.fuzzwork.co.uk/aggregates/'
  stationCode = 30000142
  testUrl = 'https://market.fuzzwork.co.uk/aggregates/?region=10000002&types=34,35,36,37,38,39,40'
  
  marketData = {};

  constructor(private http: HttpClient) {

  }

  getMarketData(): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(this.testUrl);
    // return this.http.get<MarketData[]>('https://jsonplaceholder.typicode.com/users');
  }

}
