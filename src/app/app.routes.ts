import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Recipes } from './recipes/recipes';
import { SaveRecipes } from './save-recipes/save-recipes';
import { ViewRecipe } from './view-recipe/view-recipe';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
    { path: '', component: Home, title: "Recipe Finder" },
    { path: 'about', component: About, title: "Recipe Finder | About" },
    { path: 'login', component: Login, title: "Recipe Finder | Login" },
    { path: 'register', component: Register, title: "Recipe Finder | Register" },
    { path: 'profile', component: Profile, title: "Recipe Finder | Profile" },
    { path: 'recipes', component: Recipes, title: "Recipe Finder | Recipes" },
    { path: 'recipe/saved', component: SaveRecipes, title: "Recipe Finder | Saved Recipes" },
    { path: 'recipes/:id/view', component: ViewRecipe, title: "Recipe Finder | View Recipe" },
    { path: '**', component: PageNotFound, title: "Page Not Found" },
];
