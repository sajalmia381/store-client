import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '@shared/components/api';
import { categoryDoc } from '../../common/data';

@Component({
  selector: 'app-category-doc',
  standalone: true,
  imports: [MatIconModule, ApiModule],
  templateUrl: './category-doc.component.html',
  styleUrl: './category-doc.component.scss'
})
export class CategoryDocComponent {
  categoryDoc = categoryDoc;

}