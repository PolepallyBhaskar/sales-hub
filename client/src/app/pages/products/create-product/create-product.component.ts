import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/services/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnChanges {
    productForm: FormGroup;

    categories = [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
        { label: 'Home Appliances', value: 'home-appliances' }
    ];

    @Output() formSubmit = new EventEmitter<void>();
    @Input() product: Product | null = null;
    constructor(private fb: FormBuilder, private productService: ProductService) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            price: [null, [Validators.required, Validators.min(0.01)]],
            quantity: [null, [Validators.required, Validators.min(1)]],
            category: [null, [Validators.required]]
        });
    }
    ngOnInit(): void {
        console.log("product", this.product)
        if (this.product) {
            this.productForm.patchValue(this.product); // Pre-fill form for editing
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        // Check if the product has changed
        if (changes['product'] && this.product) {
            this.productForm.patchValue(this.product); // Pre-fill form for editing
        }
    }
    onSubmit(): void {
        if (this.productForm.valid) {
            const productData = this.productForm.value;
            console.log("productData", productData)
            if (this.product && this.product.id) {
                // Update product
                this.productService
                    .updateProduct(this.product.id, productData)
                    .subscribe(() => {
                        this.productForm.reset()

                        this.formSubmit.emit()
                    });
            } else {
                // Create new product
                this.productService.createProduct(productData).subscribe(() => {
                    this.productForm.reset()
                    this.formSubmit.emit()
                });
            }
        }
        // if (this.productForm.valid) {
        //     console.log('Product Created:', this.productForm.value);
        //     this.formSubmit.emit(); // Emit event to notify parent
        // }
    }
}
