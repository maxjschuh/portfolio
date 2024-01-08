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
      image_path: './assets/img/laptop_mockup.png',
      image_alt: 'Join Mockup',
      style: '',
      test_link: '#',
      github_link: '#'
    },
    {
      title: 'El Pollo Loco',
      stack: 'JavaScript | HTML | CSS',
      description: 'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight the enemy chicken.',
      image_path: './assets/img/laptop_mockup.png',
      image_alt: 'El Pollo Loco Mockup',
      style: 'flex-direction: row-reverse;',
      test_link: '#',
      github_link: '#'
    },
    {
      title: 'Pokedex',
      stack: 'JavaScript | HTML | CSS',
      description: 'Gotta catch \'em all!',
      image_path: './assets/img/laptop_mockup.png',
      image_alt: 'Pokedex Mockup',
      style: '',
      test_link: '#',
      github_link: '#'
    }
  ];
}
