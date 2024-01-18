import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { StartComponent } from './start/start.component';
import { ScrollLocationOnPageService } from '../services/scroll-location-on-page/scroll-location-on-page.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StartComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private scrollLocationService: ScrollLocationOnPageService) { }

  // @ViewChild('start', { read: ElementRef }) startElementRef!: ElementRef;
  // @ViewChild('about', { read: ElementRef }) aboutElementRef!: ElementRef;
  // @ViewChild('contact', { read: ElementRef }) contactElementRef!: ElementRef;

  @ViewChild('skills', { read: ElementRef }) skillsElementRef!: ElementRef;
  @ViewChild('portfolio', { read: ElementRef }) portfolioElementRef!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    this.updateScrollPosition();
  }

  updateScrollPosition() {

    const topPosSkills = this.skillsElementRef.nativeElement.getBoundingClientRect().top;

    const topPosPortfolio = this.portfolioElementRef.nativeElement.getBoundingClientRect().top;

    if (topPosPortfolio < window.innerHeight) {

      this.setNewScrollPosition('portfolio');

    } else if (topPosSkills < window.innerHeight) {

      this.setNewScrollPosition('skills');

    } else this.setNewScrollPosition('about');

  }

  setNewScrollPosition(scrollPosition: string) {

    this.scrollLocationService.currentScroll.next({
      section: scrollPosition
    });
  }

}
