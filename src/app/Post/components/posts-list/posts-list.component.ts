import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'likes', 'dislikes', 'actions'];
  dataSource = new MatTableDataSource<PostDTO>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private userId: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.dataSource.data = posts.posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: postId }));
    }
  }
}