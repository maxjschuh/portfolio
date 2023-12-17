import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-project',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-project.component.html',
  styleUrl: './portfolio-project.component.scss'
})
export class PortfolioProjectComponent {

  @Input() index: number = 0;

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
