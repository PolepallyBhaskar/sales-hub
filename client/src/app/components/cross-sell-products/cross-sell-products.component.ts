import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cross-sell-products',
  templateUrl: './cross-sell-products.component.html',
  styleUrls: ['./cross-sell-products.component.scss']
})
export class CrossSellProductsComponent implements OnInit {
  displayOrderForm: boolean = false;  // Controls visibility of the order form modal
  products: any[] = [];
  orders: any[] = [];

  selectedProduct: any;
  orderForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder, private orderService: OrderService) {
    // Initialize the order form with validation
    this.orderForm = this.fb.group({
      customer_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      status: ['Pending'],
      order_date: [new Date().toISOString().substring(0, 10), Validators.required], // Default to today's date
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.loadOrders()
  }

  onCreateOrder(product: any): void {
    this.selectedProduct = product;
    this.displayOrderForm = true; // Open the form modal
  }
  loadOrders() {
    this.orderService.getCrossSellProducts().subscribe(orders => {
      console.log(" this.orders", this.orders)
      this.orders = orders;
    });
  }
  onSubmitOrder(): void {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        product_id: this.selectedProduct.id // Include product ID for the order
      };

      // Call the order service to create the order
      this.orderService.createOrder(orderData).subscribe(response => {
        console.log('Order Created:', response);
        this.displayOrderForm = false; // Close the form
        this.orderForm.reset(); // Reset the form
        this.loadOrders()

      });
    }
  }
}
