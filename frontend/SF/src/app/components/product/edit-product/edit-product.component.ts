import { Component } from '@angular/core';
import { ProductServices } from '../../../services/product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../../../Shared/navbar/navbar";

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule, Navbar, ActivatedRoute],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})


export class EditProductComponent {
  id: string | null = null;
  form: FormGroup;

  constructor (private activatedRoute :ActivatedRoute, private productService :ProductServices, private fb :FormBuilder, private router : Router) {
    this.form = this.fb.group({
      id: [{value: '', disabled: true}],
      name: [''],
      price: [''],
      description: [''],
      category: [''],
      image: ['', [Validators.pattern('https?://.+')]],
      stock: [''],
      purchasePrice: [''],
      profitPercentage: [''],
      createdAt: [''],
      updatedAt: [''],
      isActive: [true],
  });
}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (param: any) => {
        this.id = param.get('id');
      },
      error: (error: Error) => {
        console.log('Error al obtener los parámetros de la ruta:', error);
      }
    });
  }

  editProduct() {
    if(this.form.valid) {
      const values = this.form.getRawValue();
      const product = {
        id: values['id'],
        name: values['name'],
        barCode: values['barCode'],
        description: values['description'],
        priceSale: values['price'],
        purchasePrice: values['purchasePrice'],
        imageUrl: values['image'],
        stock: values['stock'],
        category: values['category'],
        profitPercentage: values['profitPercentage'],
        createdAt: new Date(values['createdAt']),
        updatedAt: new Date(),
        isActive: values['isActive']
      };

      this.productService.update(this.id, product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error: Error) => {
          console.error('Error al actualizar el producto:', error);
        }
      });
    }
  }
}
