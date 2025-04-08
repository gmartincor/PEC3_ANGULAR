import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  
  // Propiedades para ngx-charts
  chartData: any[];
  view: [number, number] = [700, 400];
  
  // Opciones del gráfico
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Interacciones';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  
  // Corregido: El formato de colorScheme ha cambiado en esta versión
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25']
  };

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;
    this.chartData = [];

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });
      
      // Actualizar datos del gráfico
      this.updateChartData();
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
  
  private updateChartData(): void {
    this.chartData = [
      {
        name: 'Likes',
        value: this.numLikes
      },
      {
        name: 'Dislikes',
        value: this.numDislikes
      }
    ];
  }
  
  onSelect(event: any): void {
    console.log('Item clicked', event);
  }
}