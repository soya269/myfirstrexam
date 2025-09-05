import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductItem } from '../product-item/product-item';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [ProductItem, NgIf, RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class Product implements OnInit {
  http = inject(HttpClient);
  products: any[] = [];
  readonly usdToKhr = 4100;

  ngOnInit() {
    const savedMap = localStorage.getItem('cartMap');
    const cartMap = savedMap ? JSON.parse(savedMap) : {};

    this.http.get<any[]>('https://sv-gen-api.bczin2zin2takeo.us/api/product').subscribe({
      next: data => {
        this.products = data.map(item => ({
          ...item,
          quantity: cartMap[item.id] || 0
        }));
      },
      error: err => console.error(' Failed to load products', err)
    });
  }

  productAdd(product: any) {
    const savedMap = localStorage.getItem('cartMap');
    const cartMap = savedMap ? JSON.parse(savedMap) : {};

    cartMap[product.id] = product.quantity;
    localStorage.setItem('cartMap', JSON.stringify(cartMap));

    localStorage.setItem('cart', JSON.stringify(this.products.filter(p => p.quantity > 0)));
  }

  clearAllproduct() {
    this.products.forEach(p => p.quantity = 0);
    localStorage.removeItem('cartMap');
    localStorage.removeItem('cart');
  }

  get subtotalEH(): number {
    return this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  get subtotalKh(): number {
    return this.subtotalEH * this.usdToKhr;
  }
    get hasProductsInCart(): boolean {
    return this.products.some(p => p.quantity > 0);
  }
}
