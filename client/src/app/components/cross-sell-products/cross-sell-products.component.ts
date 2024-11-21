// cross-sell.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Assume you have this service

@Component({
  selector: 'app-cross-sell-products',
  templateUrl: './cross-sell-products.component.html',
  styleUrls: ['./cross-sell-products.component.scss']
})
export class CrossSellProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.products = [
    //   { "id": 1, "name": "Laptop", "price": 1000 },
    //   { "id": 2, "name": "Phone", "price": 500 },
    //   { "id": 3, "name": "Tablet", "price": 300 },
    //   { "id": 4, "name": "Monitor", "price": 200 }
    // ]

    this.productService.getCrossSellProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
