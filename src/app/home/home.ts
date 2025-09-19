import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  topRecipes: any[] = []; 

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTopRecipes();
  }

  loadTopRecipes() {
    const urls = [
      'https://www.themealdb.com/api/json/v1/1/random.php',
      'https://www.themealdb.com/api/json/v1/1/random.php',
      'https://www.themealdb.com/api/json/v1/1/random.php'
    ];

    urls.forEach(url => {
      this.http.get<any>(url).subscribe(res => {
        if (res.meals && res.meals.length > 0) {
          this.topRecipes.push(res.meals[0]);
        }
      });
    });
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

 
  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
