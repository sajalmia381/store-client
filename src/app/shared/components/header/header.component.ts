import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { getUserData } from 'src/app/auth/state/auth.selectors';
import { AuthState } from 'src/app/auth/state/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData!: any;
  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.store.select(getUserData).pipe(take(1))
      .subscribe(data => {
        console.log('userData form header', data)
        this.userData = data;
      })
  }

}
