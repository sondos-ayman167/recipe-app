import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favourite.html',
  styleUrls: ['./favourite.css']
})
export class FavouriteComponent implements OnInit {
  favourites: any[] = [];

  ngOnInit(): void {
    this.loadFavourites();
  }

  
  loadFavourites() {
    const favIds: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');

    this.favourites = [];
    favIds.forEach(async (id) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        if (data.meals?.length) this.favourites.push(data.meals[0]);
      } catch (err) {
        console.error(err);
      }
    });
  }

  
  removeFavourite(index: number) {
    const favIds: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
    const removedId = this.favourites[index].idMeal;
    this.favourites.splice(index, 1);

    const updatedFavs = favIds.filter(id => id !== removedId);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
  }
}
