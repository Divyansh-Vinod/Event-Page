import { Component, OnInit } from '@angular/core';
import { EventService } from '../Services/event.service';
import { EventData } from '../event-data.type';
@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent implements OnInit {
  events: EventData[] = [];
  event_category: string = 'ALL_EVENTS';
  event_sub_catagory: string = 'Upcoming';
  selectedTags: string[] = [];
  offset: number = 0;
  loading: boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  timeAllEventStart: Date[] = [];
  timeAllEventEnd: Date[] = [];
  mobile: number = 0;
  clearTagCheck: boolean = false;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService
      .getAllEVents(
        this.event_category,
        this.event_sub_catagory,
        this.selectedTags,
        this.offset
      )
      .subscribe((response: any) => {
        this.totalPages = response.data.page_count;
        this.events = response.data.events;
        // console.log(this.events);

        for (let i = 0; i < this.events.length; i++) {
          var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
          let x: any;
          x =
            this.events[i].start_time !== undefined
              ? this.events[i].start_time
              : 0;
          t.setUTCSeconds(x);
          this.timeAllEventStart[i] = t;

          x =
            this.events[i].end_time !== undefined ? this.events[i].end_time : 0;
          t.setUTCSeconds(x);
          this.timeAllEventEnd[i] = t;
        }
        // console.log(this.events);

        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        if (this.events[0].start_time) {
          t.setUTCSeconds(this.events[0].start_time);
          // console.log(t);
        }
      });
  }

  async updateEvent() {
    this.loading = true;
    await this.eventService
      .getAllEVents(
        this.event_category,
        this.event_sub_catagory,
        this.selectedTags,
        this.offset
      )
      .subscribe((response: any) => {
        this.totalPages = response.data.page_count;
        this.events = response.data.events;
        this.loading = false;
      });
    // console.log(this.timeAllEventStart);
  }

  onChangeAllEventCategory(id: number) {
    if (id === 1) this.event_category = 'ALL_EVENTS';
    else if (id == 2) this.event_category = 'WEBINAR';
    else if (id == 3) this.event_category = 'CODING_EVENT';
    else if (id == 4) this.event_category = 'BOOTCAMP_EVENT';
    else this.event_category = 'WORKSHOP';

    this.event_sub_catagory = 'Upcoming';

    this.updateEvent();
  }

  onChangeEventSubcategory(id1: number) {
    if (id1 === 1) this.event_sub_catagory = 'Upcoming';
    else if (id1 === 2) this.event_sub_catagory = 'Archived';
    else if (id1 === 3) this.event_sub_catagory = 'All Time Favorites';

    this.updateEvent();
  }

  onChageTag(tags: string[]) {
    this.selectedTags = tags;
    this.updateEvent();
  }

  nextPage() {
    this.currentPage++;
    this.offset += 20;
    this.updateEvent();
    document.documentElement.scrollTop = 0;
  }

  prevPage() {
    this.currentPage--;
    this.offset -= 20;
    this.updateEvent();
    document.documentElement.scrollTop = 0;
  }

  functionPage() {
    var aa = (document.getElementById('pageVal') as HTMLInputElement).value;
    var a = parseInt(aa);
    this.currentPage = a;
    if (this.currentPage > this.totalPages) {
      alert('Add page less than ' + this.totalPages);
      return;
    }
    if (a > this.totalPages) return;
    else {
      this.offset = (a - 1) * 20;
      this.updateEvent();
      document.documentElement.scrollTop = 0;
    }
  }
  getMobileTags() {
    if (this.mobile == 0) this.mobile = 1;
    else this.mobile = 0;
  }
}
