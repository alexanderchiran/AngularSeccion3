import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Receta 1', 'This is simply a test', 'https://s1.eestatic.com/2020/02/17/actualidad/Actualidad_468214105_145697488_854x640.jpg'),
    new Recipe('Reta 2', 'This is simply a test', 'https://ep01.epimg.net/elcomidista/imagenes/2019/07/22/articulo/1563801848_984792_1563804092_noticia_normal.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
   this.recipeWasSelected.emit(recipe);
  }

}
