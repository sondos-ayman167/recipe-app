import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipes.html',
  styleUrls: ['./recipes.css']
})
export class RecipesComponent implements OnInit {
  meals: any[] = [];
  @Input() favoritesList: string[] = [];
  @Output() favoriteClicked = new EventEmitter<string>();

  async ngOnInit() {
    await this.GetMeals();
  }

  async GetMeals(search: string = "") {
    try {
      const Api: Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      if (!Api.ok) throw new Error(`HTTP error! Status: ${Api.status}`);

      const data = await Api.json();
      this.meals = data.meals || [];
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }

  onFavoriteClick(mealId: string) {
    let favourites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');

    if (favourites.includes(mealId)) {
      favourites = favourites.filter(id => id !== mealId);
    } else {
      favourites.push(mealId);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    this.favoritesList = favourites;
    this.favoriteClicked.emit(mealId);
  }

  isFavorite(mealId: string): boolean {
    return this.favoritesList.includes(mealId);
  }
}
