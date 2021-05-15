import { Injectable } from '@angular/core';
import { MoonOre } from '../interfaces/moon-ore';
import { Observable } from 'rxjs';
import { CharacterViewer } from '../interfaces/character-viewer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { MiningHistory } from '../interfaces/mining-history'

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService implements OnInit {

  // baseUrl = 'http://tax.vlkr.space:8090/' // this needs to be changed to a proper ip!!!
  baseUrl = '/' // this needs to be changed to a proper ip!!!
  // baseUrl = 'http://localhost:8080/' // this needs to be changed to a proper ip!!!

  characterEndpoint = this.baseUrl + 'info/characters';
  moonOreEndpoint = this.baseUrl + 'info/ore';
  holdingCorpEndpoint = this.baseUrl + 'info/holdingCorp';


  // info/getMiningHistory/?name=Arty%20Garsk
  miningHistoryEndpoint = this.baseUrl + 'info/getMiningHistory'


  characters$: Observable<CharacterViewer[]>;
  characters: CharacterViewer[] = [];
  moonOre$: Observable<MoonOre[]>;
  moonOre: MoonOre[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  async getCharacters() {
    await this.http.get<CharacterViewer[]>(this.characterEndpoint).toPromise().then((character: CharacterViewer[]) => {
      character.forEach(entry => this.characters.push(entry));
    });
    this.characters.sort((a, b) => a.name.localeCompare(b.name)); // sort by name

    // now set background
    this.setBackgroundColor();
  }

  setBackgroundColor() {
    var todayMinus14 = new Date();
    todayMinus14.setDate(todayMinus14.getDate() - 14);

    var todayMinus7 = new Date();
    todayMinus7.setDate(todayMinus7.getDate() - 7);
    this.characters.forEach(character => {
      if (character.debt < 0) {
        return;
      }
      var lastTransactionDate;
      if (character.transactionLogs.length > 0) {
        lastTransactionDate = new Date(character.transactionLogs[character.transactionLogs.length - 1].transactionDate)
      } else {
        character.background = "lightblue";
        return;
      }

      if (lastTransactionDate < todayMinus14) {
        character.background = "red";
        return;
      }
      if (lastTransactionDate < todayMinus7) {
        character.background = "yellow";
        return;
      } else {
        // everything cool!
        character.background = "";
      }
    });
  }

  getCharArray() {
    return this.characters;
  }

  getMoonOre(): Observable<MoonOre[]> {
    return this.http.get<MoonOre[]>(this.moonOreEndpoint);
  }

  getMiningHistory(name: string): Observable<MiningHistory[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<MiningHistory[]>(this.miningHistoryEndpoint, { params });
  }

  getHoldingCorp(): Observable<string> {
    return this.http.get(this.holdingCorpEndpoint, {responseType: 'text'});
  }
}
