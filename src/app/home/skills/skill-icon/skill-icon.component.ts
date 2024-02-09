import { Component, Input } from '@angular/core';
import { SkillsComponent } from '../skills.component';

@Component({
  selector: 'app-skill-icon',
  standalone: true,
  imports: [SkillsComponent],
  templateUrl: './skill-icon.component.html',
  styleUrl: './skill-icon.component.scss'
})
export class SkillIconComponent {

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

  @Input() index: number = 0;


  /**
   * Adds the path to the image for a skill icon.
   * @returns the image source path for the skill icon image
   */
  getSrc(): string {
    return `./assets/img/skills-icons/${this.skills[this.index].toLowerCase()}.svg`;
  }
}
