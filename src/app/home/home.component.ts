import { Component, ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {

  constructor(private scrollLocationService: ScrollLocationOnPageService) { }

  @ViewChild('skills', { read: ElementRef }) skillsElementRef!: ElementRef;
  @ViewChild('portfolio', { read: ElementRef }) portfolioElementRef!: ElementRef;


  /**
   * Sets the scroll position for the first time when the page has been fully loaded.
   */
  ngAfterViewInit(): void {

    // this.updateScrollPosition();
  }


  /**
   * Hosts a event listener that calls the function for updating the scroll position whenever the user scrolls the page.
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {

    this.updateScrollPosition();
  }


  /**
   * Determines the section that is currently visible in the first third of the window and passes it to the setNewScrollPosition() function as string. 
   */
  updateScrollPosition(): void {

    const topPosSkills = this.skillsElementRef.nativeElement.getBoundingClientRect().top;
    const topPosPortfolio = this.portfolioElementRef.nativeElement.getBoundingClientRect().top;
    const windowFirstThird = window.innerHeight / 3;

    if (topPosPortfolio < windowFirstThird) {

      this.setNewScrollPosition('portfolio');

    } else if (topPosSkills < windowFirstThird) {

      this.setNewScrollPosition('skills');

    } else this.setNewScrollPosition('about');
  }


  /**
   * Emits a new scroll position via the scrollLocation-Service. 
   * @param scrollPosition name of the section that should be set as new scroll position
   */
  setNewScrollPosition(scrollPosition: string): void {

    this.scrollLocationService.currentScroll.next({
      section: scrollPosition
    });
  }
}