import { Routes } from '@angular/router';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ListProduct } from './components/product/list-product/list-product';
import { AddProduct } from './components/product/add-product/add-product';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-product',
    component: AddProduct
  },
  {
    path: 'list-product',
    component: ListProduct
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];
