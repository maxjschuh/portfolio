import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';
import { PortfolioProject } from '../../interfaces/portfolio-project.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, PortfolioProjectComponent, NgFor, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  projects: PortfolioProject[] = [];

  constructor(public translate: TranslateService) {

    this.projects = [
      {
        title: 'Join',
        stack: 'JavaScript | HTML | CSS',
        description: 'portfolio.project-descriptions.join',
        image_path: './assets/img/mockups/join_mockup_v1.png',
        image_alt: 'Join Mockup',
        class: '',
        test_link: 'https://join.mjschuh.com/',
        github_link: 'https://github.com/maxjschuh/join-2.0',
        background_shadow_path: 'shadow_purple_3_alt.svg',
        background_shadow_class: ''
      },
      {
        title: 'Easy-CRM',
        stack: 'Angular | Material | SCSS | Firebase',
        description: 'portfolio.project-descriptions.crm',
        image_path: './assets/img/mockups/easy-crm_mockup.png',
        image_alt: 'Easy-CRM Mockup',
        class: 'flex-row-reverse',
        test_link: 'https://crm.mjschuh.com/dashboard',
        github_link: 'https://github.com/maxjschuh/simple-crm',
        background_shadow_path: 'shadow_blue_1.svg',
        background_shadow_class: ''
      },
      {
        title: 'El Pollo Loco',
        stack: 'JavaScript | HTML | CSS',
        description: 'portfolio.project-descriptions.el-pollo-loco',
        image_path: './assets/img/mockups/pollo-loco_mockup_v1.png',
        image_alt: 'El Pollo Loco Mockup',
        class: '',
        test_link: 'https://el-pollo-loco.mjschuh.com/',
        github_link: 'https://github.com/maxjschuh/el-pollo-loco',
        background_shadow_path: 'shadow_purple_3_alt.svg',
        background_shadow_class: ''
      },
      {
        title: 'Pokedex',
        stack: 'JavaScript | HTML | CSS',
        description: 'portfolio.project-descriptions.pokedex',
        image_path: './assets/img/mockups/pokedex_mockup.png',
        image_alt: 'Pokedex Mockup',
        class: 'flex-row-reverse',
        test_link: 'https://pokedex.mjschuh.com/index.html',
        github_link: 'https://github.com/maxjschuh/pokedex',
        background_shadow_path: 'shadow_blue_1.svg',
        background_shadow_class: ''
      }
    ];
   }

}
