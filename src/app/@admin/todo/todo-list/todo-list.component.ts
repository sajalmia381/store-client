import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  isLoaded$!: Observable<boolean>;
  displayedColumns: string[] = ['title', 'completed'];
  dataSource: any;
  isAlive: boolean = true;

}
