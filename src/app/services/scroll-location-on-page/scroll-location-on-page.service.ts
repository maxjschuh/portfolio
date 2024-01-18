import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollLocationOnPageService {

  public currentScroll = new BehaviorSubject<any>({
    section: 'start'
  });
}
