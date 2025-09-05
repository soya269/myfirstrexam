import { Routes } from '@angular/router';
import { Home } from '../Components/home/home';
import { Product } from '../Components/product/product';
import { Service } from '../Components/service/service';
import { Contact } from '../Components/contact/contact';
import { Errorpage } from '../Components/errorpage/errorpage';
import { ProductItem } from '../Components/product-item/product-item';
import { Addproduct } from '../Components/addproduct/addproduct';
import { About } from '../Components/about/about';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'product',
        component: Product
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'service',
        component: Service
      },
      {
        path: 'contact',
        component: Contact
      },
      {
        path: 'product-item',
        component: ProductItem
      },
      {
        path: 'addproduct',
        component: Addproduct
      }
    ]
  },
  {
    path: '**',
    component: Errorpage
  }
];
