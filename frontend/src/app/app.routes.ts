import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products/show',
    pathMatch: 'full'
  },
  {
    path: 'products/add',
    loadComponent: () => import('./components/add-product/add-product.component').then(m => m.AddProductComponent)
  },
  {
    path: 'products/show',
    loadComponent: () => import('./components/show-products/show-products.component').then(m => m.ShowProductsComponent)
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./components/edit-product/edit-product.component').then(m => m.EditProductComponent)
  },
  {
    path: '**',
    redirectTo: '/products/show'
  }
];
