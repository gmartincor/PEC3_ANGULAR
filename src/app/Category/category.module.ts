import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { MaterialModule } from '../Shared/material.module';

@NgModule({
  declarations: [CategoriesListComponent, CategoryFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class CategoryModule {}