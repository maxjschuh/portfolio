import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent {
  
}
