import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { Router, NavigationEnd } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


// import { BrowserModule } from '@angular/platform-browser';
// import { TranslateService } from '@ngx-translate/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import 'zone.js';

// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, HomeComponent, PrivacyPolicyComponent, HeaderComponent, FooterComponent, TranslateModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'Max Schuh | Portfolio';

//   constructor(public translate: TranslateService) {

//   }
// }






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, PrivacyPolicyComponent, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // export class AppComponent {
  title = 'Max Schuh | Portfolio';

  // constructor(public translate: TranslateService) {
  //   translate.addLangs(['de', 'en']);
  //   translate.setDefaultLang('en');

  //   const browserLang = translate.getBrowserLang();
  //   translate.use(browserLang?.match(/de|en/) ? browserLang : 'en');
  // }

  constructor(private router: Router, public translate: TranslateService) {

    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');

  }

  ngOnInit() {

    // this.router.events.subscribe(event => {
    //   AOS.refreshHard();
    //   // if (event instanceof NavigationEnd) window.scrollTo(0, 0);
    // });

  }
  //   AOS.init({
  //     // Global settings:
  //     disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  //     startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  //     initClassName: 'aos-init', // class applied after initialization
  //     animatedClassName: 'aos-animate', // class applied on animation
  //     useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  //     disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  //     debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  //     throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  //     // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  //     offset: 120, // offset (in px) from the original trigger point
  //     delay: 0, // values from 0 to 3000, with step 50ms
  //     duration: 400, // values from 0 to 3000, with step 50ms
  //     easing: 'ease', // default easing for AOS animations
  //     once: true, // whether animation should happen only once - while scrolling down
  //     mirror: false, // whether elements should animate out while scrolling past them
  //     anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  //   });
  // }
}