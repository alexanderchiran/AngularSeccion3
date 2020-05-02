import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
            private router: Router,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    /**
     * hace que se actualice la lista principal del las recetas disponibles en el recipe-list.component.html
     */
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes= this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    console.log("entra a ngOnDestroy");
    this.subscription.unsubscribe();
  }
  /**
   * navegación del sistema 
   * hace que la página se redirija a un nueva opción del routing
   */
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  /*onRecipeSelected(recipe: Recipe) {
   this.recipeWasSelected.emit(recipe);
  }*/

}
