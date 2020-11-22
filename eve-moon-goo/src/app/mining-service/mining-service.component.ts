import { Component, Input, OnInit } from '@angular/core';
import { FetchServiceService } from '../services/fetch-service.service';
import { ModalServiceService } from '../services/modal-service.service';
import { MiningHistory } from '../interfaces/mining-history';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mining-service',
  templateUrl: './mining-service.component.html',
  styleUrls: ['./mining-service.component.css']
})
export class MiningServiceComponent implements OnInit {

  miningLog$: Observable<MiningHistory[]>;

  @Input() name: string;

  constructor(private modalService: ModalServiceService, private fetchService: FetchServiceService) { }

  ngOnInit(): void {
  }

  getMiningHistory(content) {
    this.modalService.openModalLg(content);
    this.miningLog$ = this.fetchService.getMiningHistory(this.name).pipe(
      map(log => log.sort((a, b) => new Date(b.minedDate).getTime() - new Date(a.minedDate).getTime())));
  }

}
