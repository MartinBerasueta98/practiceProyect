import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Product } from '../../../models/product';
import { ProductServices } from '../../../services/product';
import { CommonModule } from '@angular/common';
import { Navbar } from "../../../Shared/navbar/navbar";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Navbar],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})

export class AddProduct implements OnInit {
  listProducts: Product[] = [];
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductServices) {
    this.productForm = this.fb.group({
      id: new FormControl(),
      name: ['', [Validators.required]],
      barCode: ['', [Validators.required]],
      priceSale: [{ value: 0, disabled: true }],
      purchasePrice: ['', [Validators.required, Validators.min(0)]],
      profitPercentage: [30, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: ['', [Validators.pattern('https?://.+')]], // Validación simple de URL
      category: ['', [Validators.required]],
      createdAt: [ new Date().toLocaleDateString('en-US')]
    });
  }

  ngOnInit() {
    this.setupFormListeners();
  }

  private setupFormListeners() {
    this.productForm.get('purchasePrice')?.valueChanges.subscribe(() => {
      this.calculateSalePrice();
    });

    this.productForm.get('profitPercentage')?.valueChanges.subscribe(() => {
      this.calculateSalePrice();
    });
  }

  calculateSalePrice() {
    const purchasePrice = this.productForm.get('purchasePrice')?.value || 0;
    const profitPercentage = this.productForm.get('profitPercentage')?.value || 0;
    const priceSale = purchasePrice * (1 + profitPercentage / 100);
    this.productForm.get('priceSale')?.setValue(priceSale.toFixed(2));
  }

  onSubmit() {
    if (this.productForm.valid) {
      const values = this.productForm.getRawValue(); // Incluye campos disabled
      const product: Product = {
        id: values['id'],
        name: values['name'],
        barCode: values['barCode'],
        description: values['description'],
        category: values['category'],
        priceSale: values['priceSale'],
        purchasePrice: values['purchasePrice'],
        profitPercentage: values['profitPercentage'],
        stock: values['stock'],
        imageUrl: values['imageUrl'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };
      this.productService.getAll().subscribe( (listProducts) => {
        this.listProducts = listProducts;
        if(this.listProducts.some(p => p.id === product.id)) {
          alert('Product with this ID already exists.');
          return;
        }else{
          this.productService.post(product).subscribe(() => {
            this.productForm.reset();
            this.productForm.get('profitPercentage')?.setValue(30); // Restablecer profitPercentage
            this.productForm.get('stock')?.setValue(0); // Restablecer stock
            });
          }
        });
    }
  }

  get nameControl() {
    return this.productForm.get('name');
  }
  get idControl() {
    return this.productForm.get('id');
  }
  get categoryControl() {
    return this.productForm.get('category');
  }
  get stockControl() {
    return this.productForm.get('stock');
  }
}
