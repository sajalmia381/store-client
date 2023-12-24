import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '@shared/components/api';
import { todoDoc } from '../../common/data';

@Component({
  selector: 'app-todo-doc',
  standalone: true,
  imports: [MatIconModule, ApiModule],
  templateUrl: './todo-doc.component.html',
  styleUrl: './todo-doc.component.scss'
})
export class TodoDocComponent {
  todoDoc = todoDoc;
}
