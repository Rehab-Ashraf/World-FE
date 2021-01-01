import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ToasterComponent } from './toaster/toaster.component';
import { FooterComponent } from './layout/footer/footer.component';



@NgModule({
  declarations: [
    ToasterComponent,
    
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
