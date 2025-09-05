import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  openmenu = false;

  get hasCart(): boolean {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return false;

    try {
      const products = JSON.parse(savedCart);
      return Array.isArray(products) && products.some((p: any) => p.quantity > 0);
    } catch {
      return false;
    }
  }
  closeNavbar() {
    this.openmenu = false; // closes mobile menu when a link is clicked
  }
}
