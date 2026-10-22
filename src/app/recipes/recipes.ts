import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  allRecipes: any = []
  cuisineArray: string[] = []
  mealTypeArray: string[] = []
  difficultyArray: string[] = []
  dummyAllRecipe: any = []
  searchKey:string=""
  selectedCuisine: string = ""
  selectedMealType: string = ""
  selectedDifficulty: string = ""
  p:number=1
  
  api = inject(ApiService)
  router = inject(Router)
  ngOnInit() {
    this.getAllRecipes()
  }

  // to call the api to get all recipes
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe({
      //success response in next
      next: (res: any) => {
        this.allRecipes = res
        this.dummyAllRecipe = res
        this.allRecipes.forEach((item: any) => {
          !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        })
        const dummyMealArray = this.allRecipes.map((item: any) => item.mealType).flat(Infinity)
        dummyMealArray.forEach((item: any) => {
          !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
        })
        this.allRecipes.forEach((item: any) => {
          !this.difficultyArray.includes(item.difficulty) && this.difficultyArray.push(item.difficulty)
        })
      }
    })
  }


  //navigate to view recipe
  navigateView(recipeId: string) {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl(`/recipes/${recipeId}/view`)
    } else {
      alert("Please login ")
    }
  }


  // filter recipe

  filterRecipe(key: string, value: string) {
    if (key === "cuisine")
      this.selectedCuisine = value
    if (key === "mealType")
      this.selectedMealType = value
    if (key === "difficulty")
      this.selectedDifficulty = value

    this.allRecipes = this.dummyAllRecipe.filter((item: any) => {
      const cuisineMatch =
        !this.selectedCuisine ||
        item.cuisine == this.selectedCuisine

      const mealTypeMatch =
        !this.selectedMealType ||
        item.mealType.includes(this.selectedMealType)

      const difficultyMatch =
        !this.selectedDifficulty ||
        item.difficulty == this.selectedDifficulty

      return cuisineMatch && mealTypeMatch && difficultyMatch
    })
  }

  // Clear all filters
  clearFilters() {
    this.selectedCuisine = ''
    this.selectedMealType = ''
    this.selectedDifficulty = ''
    this.searchKey=''
    this.allRecipes = this.dummyAllRecipe
  }


}
