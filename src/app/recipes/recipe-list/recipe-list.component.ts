import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
            private router: Router,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipes= this.recipeService.getRecipes();
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
