import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { ScrollLocationOnPageService } from '../services/scroll-location-on-page/scroll-location-on-page.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private scrollLocationService: ScrollLocationOnPageService) { }

  burgerMenuClassList: any[] = [];

  navlinks = [
    {
      classlist: ''
    },
    {
      classlist: ''
    },
    {
      classlist: ''
    }
  ];


  /**
   * Subscribes to the scroll location service that emits the current scroll position.
   */
  ngOnInit():void {

    this.scrollLocationService.currentScroll.subscribe((newValue) => {

      this.setNavLinks(newValue.section);
    });

  }


  /**
   * Sets the style of the navigation links in the header as either active or inactive depending on the current scroll position
   * @param currentSection the section that is currently visible in the viewport
   */
  setNavLinks(currentSection: string):void {

    this.navlinks.forEach(navlink => navlink.classlist = 'inactive');

    if (currentSection === 'about') {
      this.navlinks[0].classlist = 'active';

    } else if (currentSection === 'skills') {
      this.navlinks[1].classlist = 'active';

    } else if (currentSection === 'portfolio') {
      this.navlinks[2].classlist = 'active';
    }
  }


  /**
   * Sets the style of the burger menu icon as expanded or collapsed.
   */
  setBurgerMenu():void {

    if (this.burgerMenuClassList.includes('burger-menu-expanded')) {

      this.burgerMenuClassList = ['burger-menu-expanded', 'nav-links-portrait-mode-fade-out'];

      setTimeout(() => {
        this.burgerMenuClassList = [];
      }, 260);

    } else {
      this.burgerMenuClassList = ['nav-links-portrait-mode-fade-in']

      setTimeout(() => {
        this.burgerMenuClassList.push('burger-menu-expanded');
      }, 1);
    }
  }
}
