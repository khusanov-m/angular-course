import { Ingredient } from './../../shared/ingredient.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  name!: string;
  amount!: number;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const newIngredient = new Ingredient(this.name, this.amount);
    this.ingredientAdded.emit(newIngredient);
  }
}
