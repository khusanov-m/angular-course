import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService
  ) {}

  ngOnInit(): void {}
  onAddToSL() {
    this.recipeService.addIngredientsToSL(this.recipe.ingredients);
  }
  onEditRec() {}
  onDeleteRec() {}
}
