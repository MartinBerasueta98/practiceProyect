import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductServices } from '../../../services/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from "../../../Shared/navbar/navbar";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Navbar],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css'
})
export class ListProduct implements OnInit { 
  products: Product[] = [];

  ngOnInit():void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
 

  constructor(private productService: ProductServices, private router: Router) {
      this.productService.getAll();

      this.productService.products$.subscribe((products) => {
        this.products = products;
      });
  }

  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
