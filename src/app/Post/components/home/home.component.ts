import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { PostService } from '../../services/post.service';
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  stagger 
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  posts: PostDTO[];
  showButtons: boolean;

  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.posts = new Array<PostDTO>();
    this.showButtons = false;

    this.store.select('auth').subscribe((auth) => {
      this.showButtons = false;

      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
      if (auth.credentials.access_token) {
        this.showButtons = true;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }

  like(postId: string): void {
    let errorResponse: any;

    this.postService.likePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string): void {
    let errorResponse: any;

    this.postService.dislikePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}