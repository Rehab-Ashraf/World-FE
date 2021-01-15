import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';
import { AllCitiesComponent } from './all-cities/all-cities.component';
import { CityContainerModuleRouting } from './city-container-module-routing';



@NgModule({
  declarations: [AllCitiesComponent , AddEditCityComponent],
  imports: [
    CommonModule,
    CityContainerModuleRouting
  ]
})
export class CityContainerModule { }
