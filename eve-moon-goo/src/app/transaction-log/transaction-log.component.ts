import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterViewer } from '../interfaces/character-viewer';
import { FetchServiceService } from '../services/fetch-service.service';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.css']
})
export class TransactionLogComponent implements OnInit {

  @Input() character: CharacterViewer;
  transactions = [];

  constructor(private modalService: ModalServiceService, private fetchService: FetchServiceService) { }

  ngOnInit(): void {
  }

  getTransactionLog(content) {
    this.modalService.openModalLg(content);
  }

}
