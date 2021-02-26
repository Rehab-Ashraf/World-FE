import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCountriesComponent } from './all-countries/all-countries.component';
import { CountriesContainerModuleRouting } from './countries-container-module-routing';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [AllCountriesComponent],
  imports: [
    CommonModule,
    CountriesContainerModuleRouting,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class CountriesContainerModule { }
