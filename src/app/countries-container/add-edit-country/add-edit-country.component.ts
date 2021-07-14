import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddEditCityComponent } from 'src/app/city-container/add-edit-city/add-edit-city.component';
import { baseForm } from 'src/app/_core/classes/baseForm';
import { CountriesService } from 'src/app/_core/services/country-services/countries.service';
import { ToasterComponent } from 'src/app/_shared/toaster/toaster.component';

@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.css']
})
export class AddEditCountryComponent extends baseForm implements OnInit {
  
  title:string;
  isSubmit: boolean;
  addEditCountryForm:FormGroup

  formBuilder:FormBuilder
  countryService:CountriesService
  toaster:ToasterComponent

  constructor(
    private injector:Injector,
    public dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super(); 
    this.formBuilder = injector.get(FormBuilder)
    this.countryService = injector.get(CountriesService)
    this.toaster = injector.get(ToasterComponent)
  }

  ngOnInit(): void {
    this.generateCountryForm()
  }

  generateCountryForm(){
    this.addEditCountryForm = this.formBuilder.group({
      name:['',
            Validators.required,
            this.isDupeFiled("name")
          ],
      isO2:['',
            [Validators.required,Validators.pattern('[a-zA-Z]{2}')],
            this.isDupeFiled("isO2")
          ],
      isO3:['',
            [Validators.required,Validators.pattern('[a-zA-Z]{2}')],
            this.isDupeFiled("isO3")
          ],
    })
  }
  isDupeFiled(fieldName:string,):AsyncValidatorFn{
    return (countril:AbstractControl):Observable<{[key:string]:any}|null>=>{
    return this.countryService.isDupeField()
    }
  }
  onSubmit(){
    this.isSubmit = true
    if(this.addEditCountryForm.invalid){
      console.log(this.addEditCountryForm)
      return
    }else{
      //this.dialogRef.close(this.addEditCityForm.value)
      this.countryService.addCountry(this.addEditCountryForm.value).subscribe((result:any)=>{
        this.toaster.success('city added successfuly')
      })
    }
  }
}
