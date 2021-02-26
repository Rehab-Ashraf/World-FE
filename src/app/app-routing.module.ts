import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"cities",
    loadChildren:()=>
      import("./city-container/city-container.module").then(
        (mod)=>mod.CityContainerModule
      )
    },
    {
      path:"countries",
      loadChildren:()=>
        import("./countries-container/countries-container.module").then(
          (mod)=>mod.CountriesContainerModule
        )
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
