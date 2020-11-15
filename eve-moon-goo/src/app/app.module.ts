import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponseViewerComponent } from './response-viewer/response-viewer.component';
import { NgbdSortableHeader } from './response-viewer/response-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OreResponseViewerComponent } from './ore-response-viewer/ore-response-viewer/ore-response-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponseViewerComponent,
    OreResponseViewerComponent,
    ResponseViewerComponent, 
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
