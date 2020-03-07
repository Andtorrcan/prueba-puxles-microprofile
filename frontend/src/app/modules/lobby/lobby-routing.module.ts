import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { PersonsComponent } from './components/persons/persons.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HabilitiesComponent } from './components/habilities/habilities.component';


const routes: Routes = [

  {
    path: '', component: LobbyComponent, children: [
      {path: '', redirectTo: 'persons', pathMatch: 'full'},
      { path: 'persons', component: PersonsComponent},
      { path: 'courses', component: CoursesComponent},
      { path: 'habilities', component: HabilitiesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
