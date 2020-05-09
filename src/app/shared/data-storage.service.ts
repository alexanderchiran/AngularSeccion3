import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  apiUrlRestService = 'https://angularrecipealex.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        this.apiUrlRestService,
        recipes
      )
      .subscribe(response => {
        console.log("Entra a storeRecipes:");
        console.log(response);
      });
  }

  /**
   * recupera las recetas de firebase, las imprime  y las setea en el RecipeService 
   */
  fetchRecipes1() {
    this.http.get<Recipe[]>(this.apiUrlRestService).subscribe(
      recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }
    );
  }
  /**
   * recupera las recetas de firebase y las setea en el RecipeService 
   *  si tiene ingrediente retorna una lista de ingredientes de lo contrario retorna un arreglo vacío
   */
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
       this.apiUrlRestService
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
