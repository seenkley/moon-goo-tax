import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterViewer } from '../interfaces/character-viewer'
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})

export class ResponseViewerComponent implements OnInit {

  characterEndpoint = 'http://localhost:8090/info/characters';

  characters$: Observable<CharacterViewer[]>;
  searchString?: string; // ? = optional

  constructor(private http: HttpClient, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.showCharacter();
  }

  getCharacters(): Observable<CharacterViewer[]> {
    return this.http.get<CharacterViewer[]>(this.characterEndpoint);
  }

  showCharacter() {
    this.characters$ = this.getCharacters();
  }


  // modal stuff
  closeResult = '';

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

}
