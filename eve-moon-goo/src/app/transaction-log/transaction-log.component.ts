import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterViewer, TransactionLog } from '../interfaces/character-viewer';
import { FetchServiceService } from '../services/fetch-service.service';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.css']
})

export class TransactionLogComponent implements OnInit {

  @Input() character: CharacterViewer;
  transactions: TransactionLog[] = [];

  constructor(private modalService: ModalServiceService, private fetchService: FetchServiceService) { }

  ngOnInit(): void {
    this.transactions = this.character.transactionLogs as TransactionLog[];
  }

  getTransactionLog(content) {
    this.modalService.openModalLg(content);
    this.transactions = this.transactions.
      sort((a: TransactionLog, b: TransactionLog) => {
        return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
      });
  }

}
