import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { TagService } from '../Services/tags.service';
@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrls: ['./all-tags.component.css'],
})
export class AllTagsComponent implements OnInit {
  @Input() mobile: number = 0;
  @Input() clrTag: boolean = false;
  @Output() tagsEmit = new EventEmitter<string[]>();
  tags: string[] = [];
  respTags: string[] = [];
  showmore: boolean = false;
  clr: number[] = [];
  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe((resp: any) => {
      this.tags = resp.data.tags;
    });
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth > 800) 
    {
      this.mobile = 1;
      
    }
    if (this.clrTag) {
      this.clr = [];
      this.respTags = [];
    }
  }
  onTagEmit(index: number) {
    let myIndex = this.respTags.indexOf(this.tags[index]);
    if (myIndex > -1) {
      this.respTags.splice(myIndex, 1);
      this.clr[index] = 0;
    } else {
      this.clr[index] = 1;
      this.respTags.push(this.tags[index]);
    }

    this.tagsEmit.emit(this.respTags);
  }
  showMore() {
    this.showmore = true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
}
