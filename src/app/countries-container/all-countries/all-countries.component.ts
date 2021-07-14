import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from 'src/app/_core/interfaces/country';
import { CountriesService } from 'src/app/_core/services/country-services/countries.service';
import { ToasterComponent } from 'src/app/_shared/toaster/toaster.component';
import { AddEditCountryComponent } from '../add-edit-country/add-edit-country.component';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css']
})
export class AllCountriesComponent implements OnInit {

  countries:MatTableDataSource<Country>;
  displayedColumns: string[] = [
    "id",
    "name",
    "iso2",
    "iso3",
    "action"
  ];

  @ViewChild("Paginator", { static: true }) paginator: MatPaginator;

  @ViewChild("Sort", { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  pageSize: number = 20;
  pageNumber: number = 1;
  pageEvent: PageEvent;
  pageIndex: number;
  pageLength;

  sortColumn:string = "name";
  sortOrder:string = "asc"
  keyword:string = "";
  
  countryService:CountriesService
  spinner:NgxSpinnerService
  toaster:ToasterComponent
  public dialog:MatDialog
  constructor(private injector:Injector) {
    this.countryService = injector.get(CountriesService)
    this.spinner = injector.get(NgxSpinnerService)
    this.toaster = injector.get(ToasterComponent)
    this.dialog = injector.get(MatDialog)
   }

  ngOnInit(): void {
    this.getAllCountries()
  }

  getAllCountries(){
    this.sortColumn = (this.sortColumn)?this.sort.active:"name";
    this.sortOrder = (this.sortOrder)?this.sort.direction:"asc";
    console.log(this.sort)

    this.spinner.show()
    this.countryService.getAllCountries(this.pageNumber , this.pageSize,this.sortColumn , this.sortOrder ,'name',this.keyword).subscribe(
      (result:any)=>{
        this.spinner.hide()
        this.countries = new MatTableDataSource(result.data.result);
        this.pageLength = result.data.rowCount
        //this.dataSource.sort = this.sort
        this.toaster.success("all countries ......")
      }
    )
  }
  changePage(event: MatPaginator) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageNumber = this.pageIndex + 1;
    this.getAllCountries()
  }
  onAddEditCountry(row , mode){
    const dialogRef = this.dialog.open(AddEditCountryComponent, {
      width: "50vw",
      height: "auto",
      maxHeight:"90vh",
      data: {
        city: row,
        mode:mode
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        if(row == "add"){
          console.log(result);
          this.countryService.addCountry(result).subscribe((result:any)=>{
            this.toaster.success('country added successfuly')
          })
        }else{

        }
      } else {
        return;
      }
    });
  }
  onDeleteCountry(id){

  }
}
