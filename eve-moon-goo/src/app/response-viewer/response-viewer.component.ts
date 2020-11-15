import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterViewer } from '../interfaces/character-viewer'
import { MoonOre } from '../interfaces/moon-ore'
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})


export class ResponseViewerComponent implements OnInit {

  baseUrl = 'http://localhost:8090/'

  characterEndpoint = this.baseUrl + 'info/characters'; // this needs to be changed to a proper ip!!!
  moonOreEndpoint = this.baseUrl + 'info/ore';

  characters$: Observable<CharacterViewer[]>;
  characters: CharacterViewer[];
  searchString?: string; // ? = optional
  moonOre$: Observable<MoonOre[]>;

  constructor(private http: HttpClient, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.characters$ = this.getCharacters().pipe(
      map(events => events.sort((a: CharacterViewer, b: CharacterViewer) =>
        b.debt - a.debt
      )
      ));

    this.getCharacters().subscribe(character => console.log(character));

    this.moonOre$ = this.getMoonOre().pipe(
      map(events => events.sort((a: MoonOre, b: MoonOre) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      })
      )
    );
  }

  getCharacters(): Observable<CharacterViewer[]> {
    return this.http.get<CharacterViewer[]>(this.characterEndpoint);
  }

  getMoonOre(): Observable<MoonOre[]> {
    return this.http.get<MoonOre[]>(this.moonOreEndpoint);
  }


  // modal stuff
  closeResult = '';

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModalLg(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
