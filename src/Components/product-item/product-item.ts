import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css']
})
export class ProductItem implements OnInit {
  @Input() product: any;
  @Output() cartAdd = new EventEmitter<any>();

  ngOnInit(): void {
    const savedMap = localStorage.getItem('cartMap');
    const cartMap = savedMap ? JSON.parse(savedMap) : {};
    if (this.product?.id && cartMap[this.product.id]) {
      this.product.quantity = cartMap[this.product.id];
    }
  }

  increment() {
    this.product.quantity++;
    this.cartAdd.emit(this.product);
  }

  decrement() {
    if (this.product.quantity > 0) this.product.quantity--;
    this.cartAdd.emit(this.product);
  }

  clearQty() {
    this.product.quantity = 0;
    this.cartAdd.emit(this.product);
  }
}
