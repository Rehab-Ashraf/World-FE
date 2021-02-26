import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';
import { AllCitiesComponent } from './all-cities/all-cities.component';
import { CityContainerModuleRouting } from './city-container-module-routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AllCitiesComponent , AddEditCityComponent],
  imports: [
    CommonModule,
    CityContainerModuleRouting,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class CityContainerModule { }
