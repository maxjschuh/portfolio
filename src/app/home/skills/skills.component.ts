import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { SkillIconComponent } from './skill-icon/skill-icon.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgFor, SkillIconComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Firebase',
    'GIT',
    'REST-Api',
    'Scrum',
    'Material'
  ];
}
