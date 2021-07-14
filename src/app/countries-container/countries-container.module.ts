import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCountriesComponent } from './all-countries/all-countries.component';
import { CountriesContainerModuleRouting } from './countries-container-module-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditCountryComponent } from './add-edit-country/add-edit-country.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [AllCountriesComponent, AddEditCountryComponent],
  imports: [
    CommonModule,
    CountriesContainerModuleRouting,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AddEditCountryComponent
  ]
})
export class CountriesContainerModule { }
