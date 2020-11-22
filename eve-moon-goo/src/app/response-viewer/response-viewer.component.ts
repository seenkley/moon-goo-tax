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
import { ModalServiceService } from '../services/modal-service.service';

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
  miningLog$: Observable<MiningHistory[]>;

  constructor(private fetchService: FetchServiceService, private modalService: ModalServiceService) {
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
   
  }

  openModal(content) {
    this.modalService.openModal(content);
  }

  getMiningHistory(content, characterName: string) {
    this.modalService.openModalLg(content);
    this.miningLog$ = this.fetchService.getMiningHistory(characterName).pipe(
      map(log => log.sort((a, b) => new Date(b.minedDate).getTime() - new Date(a.minedDate).getTime())));
    }
}
