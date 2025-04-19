import { Component } from '@angular/core';
import { productDoc, categoryDoc, cartDoc, userDoc, authDoc, todoDoc } from '../../common/data';
import { KeyValuePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsPrismModule } from 'as-prism';

@Component({
    selector: 'app-intro-doc',
    imports: [RouterLink, NgTemplateOutlet, TitleCasePipe, KeyValuePipe, MatIconModule, AsPrismModule],
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
  demoUsageCode = `
  fetch('https://api.storerestapi.com/<RESOUCES>/<slug || id>',
    .then(response => response.json())
    .then(json => console.log(json))
  `;
}
