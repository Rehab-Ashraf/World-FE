import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"cities",
    loadChildren:()=>
      import("./city-container/city-container.module").then(
        (mod)=>mod.CityContainerModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
