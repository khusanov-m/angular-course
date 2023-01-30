import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Output() recSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.forksoverknives.com/wp-content/uploads/Crispy-Buffalo-Cauliflower-Bites.jpg'
    ),
    new Recipe(
      'A Test Recipe 2',
      'Another simply a test',
      'https://www.forksoverknives.com/wp-content/uploads/Crispy-Buffalo-Cauliflower-Bites.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(rec: Recipe) {
    this.recSelected.emit(rec);
  }
}
