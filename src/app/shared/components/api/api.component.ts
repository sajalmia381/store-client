import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IApi } from './api.interfaces';

@Component({
    selector: 'app-api',
    encapsulation: ViewEncapsulation.None,
    template: `
    <h4 class="ti-api__title">
      {{ data.name | titlecase }}
    </h4>
    @if (data.description) {
    <app-api-description>{{ data.description }}</app-api-description>
    }
    <ng-content select="app-api-description"></ng-content>
    <as-prism class="block border dark:border-gray-700 rounded mt-3" [code]="data.code" language="typescript"></as-prism>
    @if (data.output) {
    <button class="mt-3" (click)="showOutput = !showOutput" mat-stroked-button>{{ showOutput ? 'Hide Output' : 'Show Output' }}</button>
    @if (showOutput) {
    <as-prism [showCopyBtn]="false" class="block border dark:border-gray-700 rounded mt-3" [code]="output" language="json"></as-prism>
    } }
  `,
    styles: [
        `
      .ti-api__title {
        font-size: 1.15rem;
      }
      .ti-api__description {
        font-size: 14px;
        color: var(--text-hint-color);
        display: block;
        margin-top: 6px;
        font-weight: 300;
      }
    `
    ],
    host: {
        class: 'ti-api block'
    },
    standalone: false
})
export class ApiComponent implements OnInit {
  @Input({ required: true }) public data!: IApi;
  showOutput: boolean = false;

  output!: string;

  ngOnInit(): void {
    if (this.data.output && typeof this.data.output !== 'string') {
      this.output = JSON.stringify(this.data.output, null, 2);
    } else {
      this.output = this.data.output as string;
    }
  }
}
