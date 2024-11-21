// hero.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  images = [
    { src: 'assets/hero1.avif', title: 'Summer Collection' },
    { src: 'assets/hero2.avif', title: 'Winter Sale' },
    { src: 'assets/hero3.avif', title: 'New Arrivals' },
    { src: 'assets/hero4.avif', title: 'New Arrivals' },
    { src: 'assets/hero5.avif', title: 'New Arrivals' },

  ];
}
