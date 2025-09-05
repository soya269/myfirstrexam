import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
