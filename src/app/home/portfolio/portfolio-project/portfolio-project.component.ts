import { Component, Input } from '@angular/core';
import { PortfolioProject } from '../../../interfaces/portfolio-project.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-project',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio-project.component.html',
  styleUrl: './portfolio-project.component.scss'
})
export class PortfolioProjectComponent {

  @Input() project!: PortfolioProject;
  
}
