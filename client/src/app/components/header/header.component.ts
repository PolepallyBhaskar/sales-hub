import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {

  items: any;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        url: '', // Add hyperlink if needed
      },
      {
        label: 'Products',
        icon: 'pi pi-search',
        url: '/products',
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        url: '/about',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        url: '/contact',
      },
    ];

  }
}