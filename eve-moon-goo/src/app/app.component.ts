import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchServiceService } from './services/fetch-service.service';
import { ModalServiceService } from './services/modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Valkyrie Moon Tax System';
  holdingCorp$: Observable<string>;

  constructor(private modalService: ModalServiceService, private fetchService: FetchServiceService) {
    
  }

  ngOnInit() {
    this.holdingCorp$ = this.fetchService.getHoldingCorp();
  }

  openModal(content) {
    this.modalService.openModalLg(content);
  }

}
