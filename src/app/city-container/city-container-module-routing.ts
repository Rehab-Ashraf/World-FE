import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCitiesComponent } from "./all-cities/all-cities.component";

const routes:Routes = [
    {
        path:"",
        component:AllCitiesComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CityContainerModuleRouting {
}
