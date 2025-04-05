import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { productDoc } from '../../common/data';
import { ApiModule } from '@shared/components/api';

@Component({
    selector: 'app-product-doc',
    imports: [MatIconModule, ApiModule],
    templateUrl: './product-doc.component.html',
    styleUrl: './product-doc.component.scss'
})
export class ProductDocComponent {
  productDoc = productDoc;
}
