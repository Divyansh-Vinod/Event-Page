import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const URL = 'https://api.codingninjas.com/api/v3/event_tags';
@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}
  getAllTags() {
    return this.http.get(URL);
  }
}
