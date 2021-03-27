import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { City } from 'src/app/_core/interfaces/city';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterComponent } from 'src/app/_shared/toaster/toaster.component';
import { CityService } from 'src/app/_core/services/city-services/city.service';
import { AddEditCityComponent } from '../add-edit-city/add-edit-city.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.css']
})
export class AllCitiesComponent implements OnInit {

  cities:MatTableDataSource<City>;
  displayedColumns: string[] = [
    "id",
    "name",
    "name_ASCII",
    "latitude",
    "longtitude",
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
  
  cityService:CityService
  spinner:NgxSpinnerService
  toaster:ToasterComponent
  public dialog: MatDialog

  constructor(private injector:Injector) {
    this.cityService = injector.get(CityService)
    this.spinner = injector.get(NgxSpinnerService)
    this.toaster = injector.get(ToasterComponent)
    this.dialog = injector.get(MatDialog)
   }

  ngOnInit(): void {
    this.getAllCities()
  }

  getAllCities(){
    this.sortColumn = (this.sortColumn)?this.sort.active:"name";
    this.sortOrder = (this.sortOrder)?this.sort.direction:"asc";
    console.log(this.sort)

    this.spinner.show()
    this.cityService.getAllCities(this.pageNumber , this.pageSize,this.sortColumn , this.sortOrder ,'name',this.keyword).subscribe(
      (result:any)=>{
        this.spinner.hide()
        this.cities = new MatTableDataSource<City>(result.data.result);
        this.pageLength = result.data.rowCount
        //this.dataSource.sort = this.sort
        this.toaster.success("all cities ......")
      }
    )
  }

  changePage(event: MatPaginator) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageNumber = this.pageIndex + 1;
    this.getAllCities()
  }

  onAddEditCity(row , mode){
    const dialogRef = this.dialog.open(AddEditCityComponent, {
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

          this.cityService.addCity(result).subscribe((result:any)=>{
            this.toaster.success('city added successfuly')
          })
        }else{

        }
      } else {
        return;
      }
    });
  }
  onDeleteCity(id){

  }
}
