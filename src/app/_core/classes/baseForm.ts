import { FormGroup } from "@angular/forms";

export class baseForm{
    form:FormGroup;

      //retrieve a formcontrol
  getControl(name:string){
    return this.form.get(name);
  }

  //returns true if the formControl is valid 
  isValid(name:string){
    var e = this.getControl(name);
    return e && e.valid
  }

  //returns true if the formControl has been changed 
  isChanged(name:string){
    var e = this.getControl(name);
    return e && (e.dirty || e.touched);
  }

  //returns true if the formControl is raising an error , i.e. an invalid state after user changes 
  hasError(name:string){
    var e = this.getControl(name);
    return e && (e.dirty || e.touched) && e.invalid;
  }
}