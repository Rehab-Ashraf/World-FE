import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiService:ApiService) { }

  getAllCities(pageNumber , pageSize,sortColumn,sortOrder,filterColumn , keyword){
    var params = new HttpParams()
                     .set("PageNumber",pageNumber)
                     .set("PageSize",pageSize)
                     .set("sortColumn",sortColumn)
                     .set("sortOrder",sortOrder)
                     .set("filterColumn",filterColumn)
                     .set("filterQuery",keyword)
    return this.apiService.get(`Cities`,params);
  }

  isDupeCity(city){
    return this.apiService.post(`Cities/IsDupeCity`,city);
  }
  addCity(city){
    return this.apiService.post(`Cities`,city);
  }
}
