import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.loadProduct();
    });
  }

  loadProduct() {
    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        alert('Error loading product: ' + err.message);
      }
    });
  }

  onSubmit() {
    this.productService.update(this.productId, this.product).subscribe({
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
