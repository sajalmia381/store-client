import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '@shared/components/api';
import { userDoc } from '../../common/data';

@Component({
  selector: 'app-user-doc',
  standalone: true,
  imports: [MatIconModule, ApiModule],
  templateUrl: './user-doc.component.html',
  styleUrl: './user-doc.component.scss'
})
export class UserDocComponent {
  userDoc = userDoc;
}
