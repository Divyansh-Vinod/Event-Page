import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { HttpClientModule } from '@angular/common/http';
import { AllTagsComponent } from './all-tags/all-tags.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    AllEventsComponent,
    AllTagsComponent,
    EventComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
