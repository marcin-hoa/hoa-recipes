import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from './dto/RecipeDto';

@Injectable()
export class RecipesRepository {
  private baseUrl: string;

  constructor(private client: HttpClient) {
    this.baseUrl = `/api/recipes`;
  }

  getAll(): Observable<RecipeDto[]> {
    return this.client.get<RecipeDto[]>(`${this.baseUrl}`);
  }
}
