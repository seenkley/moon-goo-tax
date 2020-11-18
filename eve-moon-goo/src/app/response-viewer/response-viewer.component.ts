import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterViewer } from '../interfaces/character-viewer';
import { MoonOre } from '../interfaces/moon-ore';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { FetchServiceService } from '../services/fetch-service.service'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MiningHistory } from '../interfaces/mining-history';

export type SortColumn = keyof CharacterViewer | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})

export class ResponseViewerComponent {

  characters: CharacterViewer[] = [];
  searchString?: string; // ? = optional
  moonOre$: Observable<MoonOre[]>;
  miningLog$: Observable<MiningHistory[]>;

  constructor(private modalService: NgbModal, private fetchService: FetchServiceService) {
    this.fetchService.getCharacters();
    this.characters = this.fetchService.getCharArray()
  }

  ngOnInit() {
    this.init();
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.characters = this.fetchService.getCharArray();
    } else {
      this.characters = [...this.fetchService.getCharArray()].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  init() {
    this.moonOre$ = this.fetchService.getMoonOre().pipe(
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

  getMiningHistory(content, characterName: string) {
    this.openModalLg(content);
    this.miningLog$ = this.fetchService.getMiningHistory(characterName).pipe(
      map(log => log.sort((a, b) => new Date(b.minedDate).getTime() - new Date(a.minedDate).getTime())));
    }
}
