import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';  
import { RecipesComponent } from './recipes/recipes';
import { FavouriteComponent } from './favourite/favourite';
import { LoginComponent } from './login/login';
import { DetailsComponent } from './details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:id', component: DetailsComponent }, // لازم قبل الـ wildcard
  { path: '**', redirectTo: 'home' } // الـ wildcard دايمًا في الآخر
];
