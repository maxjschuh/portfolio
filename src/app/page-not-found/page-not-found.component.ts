import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

  constructor(public translate: TranslateService, private titleService: Title) {

    this.titleService.setTitle(this.translate.instant("titles.404"));

    translate.onLangChange.subscribe(() => {
      this.titleService.setTitle(this.translate.instant("titles.404"));
    });
  }
}
