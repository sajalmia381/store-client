import { Component } from '@angular/core';

@Component({
    selector: 'app-api-description',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'ti-api__description'
    },
    standalone: false
})
export class ApiDescriptionComponent {}
