import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  apiUrlRestService = 'https://angularrecipealex.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

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
    //take toma el primer registro y luego se desusbribe 

    return this.http.get<Recipe[]>(
      this.apiUrlRestService
    ).pipe(
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

  fetchRecipesOld1() {
    //take toma el primer registro y luego se desusbribe 
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(
        this.apiUrlRestService,
        {
          params: new HttpParams().set('auth', user.token)
        }
      );
    }),
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
