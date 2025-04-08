// src/app/Shared/Components/spinner/spinner.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public showSpinner = false;  // Cambiamos de spinnerState a una propiedad simple

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Suscribimos para escuchar los cambios de estado en auth
    this.store.select('auth').subscribe(auth => {
      if (auth.loading) {
        this.showSpinner = true;
      } else if (auth.loaded) {
        this.showSpinner = false;
      }
    });

    // Suscribimos para escuchar los cambios de estado en posts
    this.store.select('posts').subscribe(posts => {
      if (posts.loading) {
        this.showSpinner = true;
      } else if (posts.loaded) {
        this.showSpinner = false;
      }
    });

    // Suscribimos para escuchar los cambios de estado en categories
    this.store.select('categories').subscribe(categories => {
      if (categories.loading) {
        this.showSpinner = true;
      } else if (categories.loaded) {
        this.showSpinner = false;
      }
    });

    // Suscribimos para escuchar los cambios de estado en user
    this.store.select('user').subscribe(user => {
      if (user.loading) {
        this.showSpinner = true;
      } else if (user.loaded) {
        this.showSpinner = false;
      }
    });
  }
}