import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ImprintComponent {

}
