import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.getRawValue();
    const product: Product = {
      id: 0,
      name: formValue.name ?? '',
      description: formValue.description ?? '',
      price: formValue.price ?? 0,
      quantity: formValue.quantity ?? 0
    };

    this.productService.add(product).subscribe({
      next: () => {
        this.router.navigate(['/products/show']);
      },
      error: (err) => {
        alert('Error adding product: ' + err.message);
      }
    });
  }
}
