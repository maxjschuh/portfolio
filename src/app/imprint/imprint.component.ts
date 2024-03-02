import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ImprintComponent {

  constructor(public translate: TranslateService, private titleService: Title) {

    this.titleService.setTitle(this.translate.instant("titles.imprint"));

    translate.onLangChange.subscribe(() => {
      this.titleService.setTitle(this.translate.instant("titles.imprint"));
    });
  }

}
