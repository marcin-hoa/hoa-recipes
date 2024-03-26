import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRecipeDto, RecipeDto } from './dto/RecipeDto';

@Injectable()
export class RecipesRepository {
  private baseUrl = '/api/recipes';

  private client = inject(HttpClient);

  findAll(): Observable<RecipeDto[]> {
    return this.client.get<RecipeDto[]>(this.baseUrl);
  }

  findOne(id: string): Observable<RecipeDto> {
    return this.client.get<RecipeDto>(`${this.baseUrl}/${id}`);
  }

  create(recipeDto: CreateRecipeDto): Observable<RecipeDto> {
    return this.client.post<RecipeDto>(this.baseUrl, recipeDto);
  }

  update(recipeDto: RecipeDto): Observable<RecipeDto> {
    return this.client.patch<RecipeDto>(
      `${this.baseUrl}/${recipeDto.id}`,
      recipeDto,
    );
  }

  delete(recipeId: string): Observable<void> {
    return this.client.delete<void>(`${this.baseUrl}/${recipeId}`);
  }

  uploadImage(recipeId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);

    return this.client.post<string>(
      `${this.baseUrl}/${recipeId}/image`,
      formData,
    );
  }

  deleteImage(recipeId: string): Observable<void> {
    return this.client.delete<void>(`${this.baseUrl}/${recipeId}/image`);
  }
}
