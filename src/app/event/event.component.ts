import { Component, OnInit, Input } from '@angular/core';
import { EventData } from '../event-data.type';
import { ResisterUser } from '../resistered-user.type';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @Input() event: EventData = {};
  @Input() timestart: Date = new Date();
  register_user: ResisterUser = {};
  countResiterUser: number = 0;
  top_user: any;
  card_tag_length: number = 0;
  start_time: Date = new Date();
  resistarationEndTime: Date = new Date();
  todaysDate: Date = new Date();
  constructor() {}

  ngOnInit(): void {
    if (this.event.short_desc && this.event.short_desc.length > 200) {
      this.event.short_desc = this.event.short_desc.substring(0, 199) + '...';
    }
    if (this.event.registered_users) {
      this.register_user = this.event.registered_users;
      this.top_user = this.event.registered_users.top_users;
    }
    if (this.register_user.other_users_count)
      this.countResiterUser = this.register_user.other_users_count;
    if (this.event.card_tags)
      this.card_tag_length = this.event.card_tags.length;
    if (this.event.event_start_time) {
      this.start_time = new Date(this.event.event_start_time * 1000);
    }
    if (this.event.cover_picture == null)
      this.event.cover_picture =
        'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
    if (this.event.registration_end_time)
      this.resistarationEndTime = new Date(
        this.event.registration_end_time * 1000
      );
    this.todaysDate = new Date();
    // console.log(this.event.registration_status, this.event.name);
  }
}
