import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-error-404',
    imports: [RouterLink, MatButtonModule],
    templateUrl: './error-404.component.html',
    styleUrl: './error-404.component.scss'
})
export class Error404Component {
  private route = inject(ActivatedRoute);

  data = this.route.snapshot.data;
}
