import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { StartComponent } from './start/start.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StartComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  offsetTop = {
    startComponent: 0,
    aboutComponent: 0,
    skillsComponent: 0,
    portfolioComponent: 0,
    contactComponent: 0
  }

  @ViewChild('start', { read: ElementRef }) startElementRef!: ElementRef;
  @ViewChild('about', { read: ElementRef }) aboutElementRef!: ElementRef;
  @ViewChild('skills', { read: ElementRef }) skillsElementRef!: ElementRef;
  @ViewChild('portfolio', { read: ElementRef }) portfolioElementRef!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactElementRef!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // console.log('scrolling');
    this.updateOffsets();
  }

  updateOffsets() {

    const element = this.startElementRef.nativeElement;
    const rect = element.getBoundingClientRect();

    const distanceToTop = rect.top;

    console.log(distanceToTop)

  }
}
