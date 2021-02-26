import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCountriesComponent } from "./all-countries/all-countries.component";

const routes:Routes = [
    {
        path:"",
        component:AllCountriesComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CountriesContainerModuleRouting {
}
