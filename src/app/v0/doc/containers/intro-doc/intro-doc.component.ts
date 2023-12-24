import { Component } from '@angular/core';
import { productDoc, categoryDoc, cartDoc, userDoc, authDoc, todoDoc } from '../../common/data';
import { JsonPipe, KeyValuePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-intro-doc',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, JsonPipe, TitleCasePipe, KeyValuePipe, MatIconModule],
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
