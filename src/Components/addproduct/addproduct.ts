import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  imports: [NgFor],
  templateUrl: './addproduct.html',
  styleUrls: ['./addproduct.css']
})
export class Addproduct implements OnInit {
  products: any[] = [];
  usdToKhr = 4100;

  ngOnInit(): void {
    const storedMap = localStorage.getItem('cartMap');
    if (storedMap) {
      const cartMap = JSON.parse(storedMap);

      // If you have saved full product list in localStorage
      const storedProducts = localStorage.getItem('cart');
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        this.products = parsed
          .filter((p: any) => cartMap[p.id] > 0)
          .map((p: any) => ({
            ...p,
            quantity: cartMap[p.id]
          }));
      }
    }
  }

  saveToLocalStorage() {
    const map: Record<number, number> = {};
    this.products.forEach(p => map[p.id] = p.quantity);
    localStorage.setItem('cartMap', JSON.stringify(map));
  }

  increment(product: any) {
    product.quantity++;
    this.saveToLocalStorage();
  }

  decrement(product: any) {
    if (product.quantity > 0) product.quantity--;
    this.saveToLocalStorage();
  }

  get subtotalEH(): number {
    return this.products.reduce(
      (total, p) => total + p.price * (1 - (p.discountPercentage || 0) / 100) * p.quantity,
      0
    );
  }

  get subtotalKh(): number {
    return this.subtotalEH * this.usdToKhr;
  }

  get totalQuantity(): number {
    return this.products.reduce((sum, p) => sum + p.quantity, 0);
  }

  payNow() {
    alert(
      `🧾 Order Summary\n\n` +
      `🧮 Total Quantity: ${this.totalQuantity}\n` +
      `💰 Total Price: $${this.subtotalEH.toFixed(2)}\n` +
      `💰 Total Price (៛): ${new Intl.NumberFormat('km-KH').format(this.subtotalKh)}`
    );

    alert('✅ Payment Successful\nThank you for your purchase!');
    

  this.products.forEach(p => p.quantity = 0);

  localStorage.removeItem('cartMap');
  localStorage.removeItem('cart');
  }
}
