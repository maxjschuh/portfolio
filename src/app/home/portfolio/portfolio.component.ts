import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';
import { PortfolioProject } from '../../interfaces/portfolio-project.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, PortfolioProjectComponent, NgFor],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  projects: PortfolioProject[] =  [
    {
      title: 'Join',
      stack: 'JavaScript | HTML | CSS',
      description: 'Join is a CRUD-App in form of an easy to use project management tool. Its core function is a Kanban Board, on which users can switch tasks between columns by drag-and-drop. Tasks can be enriched with various additional data such as assignees, subtasks and labels. <br> <br> Join was created in a team of 4 web development trainees, in which I was responsible for the Kanban Board subpage. ',
      image_path: './assets/img/mockups/join_mockup_v1.png',
      image_alt: 'Join Mockup',
      class: '',
      test_link: 'https://join.mjschuh.com/',
      github_link: 'https://github.com/maxjschuh/join-2.0'
    },
    {
      title: 'El Pollo Loco',
      stack: 'JavaScript | HTML | CSS',
      description: 'El Pollo Loco is a 2D runner game in a wild west themed world. It features animated characters, a randomly generated level and random endboss behaviour. Players can use mouse, keyboard or touch controls. <br><br> I used object-oriented programming to allow for easier maintenance and modular expandability of the project.',
      image_path: './assets/img/mockups/pollo-loco_mockup_v1.png',
      image_alt: 'El Pollo Loco Mockup',
      class: 'flex-row-reverse',
      test_link: 'https://el-pollo-loco.mjschuh.com/',
      github_link: 'https://github.com/maxjschuh/el-pollo-loco'
    }
  ];
}
