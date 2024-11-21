import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/services/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  displayModal: boolean = false; // Controls dialog visibility
  products: Product[] = [];
  selectedProduct: any;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  onCreate(): void {
    this.displayModal = true; // Open the modal
  }
  onEdit(product: Product): void {
    this.selectedProduct = { ...product }; // Open form with product data
    this.displayModal = true; // Open the modal

  }
  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Reload the list after deletion
      });
    }
  }
  onFormSubmit(): void {
    // Handle form submission (for example, add product to product list)
    this.displayModal = false; // Close the modal
    this.loadProducts()

  }
}
