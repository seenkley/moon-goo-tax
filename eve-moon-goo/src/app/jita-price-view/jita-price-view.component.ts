import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MoonOre } from '../interfaces/moon-ore';
import { Observable } from 'rxjs';
import { FetchServiceService } from '../services/fetch-service.service'
import { map } from 'rxjs/operators';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-jita-price-view',
  templateUrl: './jita-price-view.component.html',
  styleUrls: ['./jita-price-view.component.css']
})
export class JitaPriceViewComponent implements OnInit {

  moonOre$: Observable<MoonOre[]>;

  constructor(private fetchService: FetchServiceService, private modalService: ModalServiceService) { }

  ngOnInit(): void {
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

  closeResult = '';

  openModalLg(content) {
    this.modalService.openModalLg(content);
  }
}
