import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Material
 */
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsComponent } from './components/persons/persons.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HabilitiesComponent } from './components/habilities/habilities.component';


@NgModule({
  declarations: [LobbyComponent, PersonsComponent, CoursesComponent, HabilitiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
