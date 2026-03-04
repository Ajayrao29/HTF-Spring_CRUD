import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number = 0;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.loadProduct();
    });
  }

  loadProduct() {
    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        this.productForm.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity
        });
      },
      error: (err) => {
        alert('Error loading product: ' + err.message);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.getRawValue();
    const product: Product = {
      id: this.productId,
      name: formValue.name ?? '',
      description: formValue.description ?? '',
      price: formValue.price ?? 0,
      quantity: formValue.quantity ?? 0
    };

    this.productService.update(this.productId, product).subscribe({
      next: () => {
        this.router.navigate(['/products/show']);
      },
      error: (err) => {
        alert('Error updating product: ' + err.message);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/products/show']);
  }
}
