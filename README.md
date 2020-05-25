# Descargar Dependencias 
path_project>npm install

# Comandos varios 
 ng g c recipes --spec false 

# AngularSeccion3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## FormsModule

One quick note: In case you're hitting an error in the next lecture, make sure you have FormsModule added to your imports[] in the AppModule

## Provider 

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //provider inject a services
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      );
  }

}

## Deleting all Items in a FormArray
As of Angular 8+, there's a new way of clearing all items in a FormArray.

(<FormArray>this.recipeForm.get('ingredients')).clear();
The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

It's like manually creating a loop and calling removeAt() for every item.

## Compile for production mode
> ng build --prod

## install Firebase tools

npm install -g firebase-tools

>firebase login

>firebase init

selecciona hosting
selecciona la bd creada
? What do you want to use as your public directory? dist/AngularSeccion3  
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File dist/AngularSeccion3/index.html already exists. Overwrite? No

>firebase deploy

https://angularrecipealex.web.app

## Install NgRx
$ npm install --save @ngrx/store
