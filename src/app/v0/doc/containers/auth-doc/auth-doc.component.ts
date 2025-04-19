import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '@shared/components/api';
import { authDoc } from '../../common/data';

@Component({
    selector: 'app-auth-doc',
    imports: [MatIconModule, ApiModule],
    templateUrl: './auth-doc.component.html',
    styleUrl: './auth-doc.component.scss'
})
export class AuthDocComponent {
  authDoc = authDoc;
}
