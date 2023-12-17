import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioProjectComponent, NgFor],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  projects = [
    {
      title: 'Join',
      stack: 'JavaScript | HTML | CSS',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image_path: 'akjhsdghjasgd',
      image_alt: 'Join Mockup',
      image_orientation_left: true,
      test_link: 'lorem',
      github_link: 'lorem'
    }
  ];
}
