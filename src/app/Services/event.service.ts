import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventData } from '../event-data.type';
const URL = 'https://api.codingninjas.com/api/v3/events';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  events: EventData[] = [];

  constructor(private http: HttpClient) {}

  getAllEVents(
    eventCategory: string,
    event_sub_category: string,
    tag_list: string[],
    offset: number
  ) {
    let parms = `?event_category=${eventCategory}&event_sub_category=${event_sub_category}&tag_list=`;
    let tagList = '';
    if (tag_list) tagList = tag_list.join(',');
    parms += tagList;
    parms += `&offset=${offset}`;
    return this.http.get(URL + parms);
  }
}
