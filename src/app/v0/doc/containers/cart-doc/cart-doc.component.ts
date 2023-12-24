import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '@shared/components/api';
import { cartDoc } from '../../common/data';

@Component({
  selector: 'app-cart-doc',
  standalone: true,
  imports: [MatIconModule, ApiModule],
  templateUrl: './cart-doc.component.html',
  styleUrl: './cart-doc.component.scss'
})
export class CartDocComponent {
  cartDoc = cartDoc;
}
