import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent {

  constructor(public translate: TranslateService, private titleService: Title) {

    this.titleService.setTitle(this.translate.instant("titles.privacy-policy"));

    translate.onLangChange.subscribe(() => {
      this.titleService.setTitle(this.translate.instant("titles.privacy-policy"));
    });
  }

}