import { Component } from '@angular/core';
import { ModalServiceService } from './services/modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Valkyrie Moon Tax System';

  constructor(private modalService: ModalServiceService) {
    
  }

  openModal(content) {
    this.modalService.openModalLg(content);
  }

}
