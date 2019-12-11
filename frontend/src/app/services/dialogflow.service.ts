import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable()
export class DialogflowService {

  private baseURL: string = "http://127.0.0.1:80";	
  

  constructor(private http: HttpClient){}

  getResponse(text : string []){
    return this.http.post(this.baseURL,{sentences:text})
  }

}

