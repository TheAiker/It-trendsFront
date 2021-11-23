import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupsComponent } from "./components/groups/groups.component";
import { HomeComponent } from "./components/home/home.component";
import { StudentsComponent } from "./components/students/students.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "groups", component: GroupsComponent },
  { path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
