import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  //property
  stars = Array(5);
  allRecipes:any=[]
  api=inject(ApiService);
  router=inject(Router)
  
  //lifecycle hook
  ngOnInit(){
    this.getHomeRecipes()
  }

  // to call the api to get all recipes
  getHomeRecipes(){
    this.api.getHomeRecipesApi().subscribe((res:any)=>{
      this.allRecipes=res
    })
  }

  navigateView(recipeId:string){
    if(sessionStorage.getItem("token"))
    {
      this.router.navigateByUrl(`/recipes/${recipeId}/view`)
    }else{
      alert("Please login ")
    }
  }
}
