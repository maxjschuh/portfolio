import { Component, HostListener, OnInit } from '@angular/core';
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

  ngOnInit() {

    this.scrollLocationService.currentScroll.subscribe((newValue) => {

      this.setNavLinks(newValue.section);
    });

  }

  setNavLinks(currentSection: string) {

    this.navlinks.forEach(navlink => navlink.classlist = 'inactive');

    if (currentSection === 'about') {
      this.navlinks[0].classlist = 'active';

    } else if (currentSection === 'skills') {
      this.navlinks[1].classlist = 'active';

    } else this.navlinks[2].classlist = 'active';
  }

}
