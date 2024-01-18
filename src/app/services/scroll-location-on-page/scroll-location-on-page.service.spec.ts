import { TestBed } from '@angular/core/testing';

import { ScrollLocationOnPageService } from './scroll-location-on-page.service';

describe('ScrollLocationOnPageService', () => {
  let service: ScrollLocationOnPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollLocationOnPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
