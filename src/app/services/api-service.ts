import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http=inject(HttpClient);
  serverUrl="http://localhost:3000"

  //get all recipes
  getAllRecipesApi(){
    return this.http.get(`${this.serverUrl}/recipes/all`);
  }

  getHomeRecipesApi(){
    return this.http.get(`${this.serverUrl}/recipes/home`);
  }

  //register
  registerApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
  }
}
