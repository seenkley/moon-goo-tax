import { Injectable } from '@angular/core';
import { MoonOre } from '../interfaces/moon-ore';
import { Observable } from 'rxjs';
import { CharacterViewer } from '../interfaces/character-viewer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MiningHistory } from '../interfaces/mining-history'

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService implements OnInit {

  baseUrl = 'http://localhost:8090/' // this needs to be changed to a proper ip!!!

  characterEndpoint = this.baseUrl + 'info/characters';
  moonOreEndpoint = this.baseUrl + 'info/ore';


  // info/getMiningHistory/?name=Arty%20Garsk
  miningHistoryEndpoint = this.baseUrl + 'info/getMiningHistory'


  characters$: Observable<CharacterViewer[]>;
  characters: CharacterViewer[] = [];
  moonOre$: Observable<MoonOre[]>;
  moonOre: MoonOre[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  }

  async getCharacters() {
    await this.http.get<CharacterViewer[]>(this.characterEndpoint).toPromise().then((character: CharacterViewer[]) => {
      character.forEach(entry => this.characters.push(entry));
    });
    this.characters.sort((a,b) => a.name.localeCompare(b.name)); // sort by name
  }

  getCharArray() {
    return this.characters;
  }

  getMoonOre(): Observable<MoonOre[]> {
    return this.http.get<MoonOre[]>(this.moonOreEndpoint);
  }

  getMiningHistory(name: string): Observable<MiningHistory[]>{
    const params = new HttpParams().set('name', name);
    return this.http.get<MiningHistory[]>(this.miningHistoryEndpoint, {params});
  }
}
