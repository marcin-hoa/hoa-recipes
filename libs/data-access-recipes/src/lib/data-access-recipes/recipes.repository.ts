import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from './dto/RecipeDto';

@Injectable()
export class RecipesRepository {
  private baseUrl = '/api/recipes';

  private client = inject(HttpClient);

  getAll(): Observable<RecipeDto[]> {
    return this.client.get<RecipeDto[]>(`${this.baseUrl}`);
  }
}
