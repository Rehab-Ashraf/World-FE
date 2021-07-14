import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseForm } from 'src/app/_core/classes/baseForm';
import { City } from 'src/app/_core/interfaces/city';
import { Country } from 'src/app/_core/interfaces/country';
import { CityService } from 'src/app/_core/services/city-services/city.service';
import { CountriesService } from 'src/app/_core/services/country-services/countries.service';
import { ToasterComponent } from 'src/app/_shared/toaster/toaster.component';

@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.css']
})
export class AddEditCityComponent extends baseForm implements OnInit {

  title:string;
  addEditCityForm:FormGroup;
  city:City;
  isSubmit: boolean;

  countries: Country[];
  dupeCity: any;


  constructor(
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private spinner:NgxSpinnerService,
    private countryService:CountriesService,
    private cityService:CityService,
    private toaster:ToasterComponent
    ) { 
      super();
    }

  ngOnInit(): void {
    this.generateCityForm()
    this.getAllCountries()

    if(this.data.mode == 'edit'){
      this.city = this.data?.city
      this.title = `Edit Ctiy ${this.city.name}`
      // this.addEditCityForm.addControl('countryId', new FormControl(this.city.countryId, Validators.required));
      this.addEditCityForm.patchValue(this.data?.city)
    }else{
      this.title = `Create a new city`
    }
  }
  getAllCountries() {
    this.spinner.show()
    this.countryService.getAllCountries(1,300,null,null,null,null).subscribe((result:any)=>{
        this.spinner.hide()
        this.countries = result.data.result;
      })
  }

  generateCityForm() {
    this.addEditCityForm = new FormGroup({
      id:new FormControl(0),
      name:new FormControl('',Validators.required),
      name_ASCII:new FormControl(''),
      latitude:new FormControl('',[Validators.required,Validators.pattern('^[-]?[0-9]+(\.[0-9]{1,4})?$')]),
      longtitude:new FormControl('',[Validators.required,Validators.pattern('^[-]?[0-9]+(\.[0-9]{1,4})?$')]),
      countryId:new FormControl('',Validators.required),
    },null,this.isDupeCity())
  }


  onSubmit(){
    this.isSubmit = true
    console.log(this.isDupeCity())

    if(this.addEditCityForm.invalid && this.isDupeCity){
      console.log(this.addEditCityForm)
      return
    }else{
      //this.dialogRef.close(this.addEditCityForm.value)
      this.cityService.addCity(this.addEditCityForm.value).subscribe((result:any)=>{
        this.toaster.success('city added successfuly')
      })
    }
  }

  isDupeCity():AsyncValidatorFn{
    return (control:AbstractControl):Observable<{ [key:string] :any} | null> =>{
     return this.cityService.isDupeCity(this.addEditCityForm.value).pipe(map(result =>{ 
        return (result ? {isDupeCity:true}:null);
      }));
    }
  }


}
