import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-show-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products$: Observable<Product[]> = this.productService.products$;
  sortOrder: string = '';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(sortByPrice?: string) {
    this.productService.getAll(sortByPrice).subscribe({
      error: (err) => {
        alert('Error loading products: ' + err.message);
      }
    });
  }

  onSortChange() {
    this.loadProducts(this.sortOrder || undefined);
  }

  onEdit(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        error: (err) => {
          alert('Error deleting product: ' + err.message);
        }
      });
    }
  }
}
