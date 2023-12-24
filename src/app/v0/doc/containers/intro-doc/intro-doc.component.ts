import { Component } from '@angular/core';
import { productDoc, categoryDoc, cartDoc, userDoc, authDoc, todoDoc } from '../../common/data';
import { JsonPipe, KeyValuePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-intro-doc',
  standalone: true,
  imports: [NgTemplateOutlet, JsonPipe, TitleCasePipe, KeyValuePipe],
  templateUrl: './intro-doc.component.html',
  styleUrl: './intro-doc.component.scss'
})
export class IntroDocComponent {
  productDoc = productDoc;
  categoryDoc = categoryDoc;
  cartDoc = cartDoc;
  userDoc = userDoc;
  authDoc = authDoc;
  todoDoc = todoDoc;
}
