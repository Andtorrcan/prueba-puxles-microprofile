import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/**
 * Material
 */
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsComponent } from './components/persons/persons.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HabilitiesComponent } from './components/habilities/habilities.component';
import { HabilityService } from 'src/app/services/hability/hability.service';
import { DialogHabilityCreateComponent } from './components/habilities/dialog-hability-create/dialog-hability-create.component';
import { DialogHabilityUpdateComponent } from './components/habilities/dialog-hability-update/dialog-hability-update.component';
import { DialogCourseCreateComponent } from './components/courses/dialog-course-create/dialog-course-create.component';
import { DialogCourseUpdateComponent } from './components/courses/dialog-course-update/dialog-course-update.component';
import { CourseService } from 'src/app/services/course/course.service';
import { MatNativeDateModule } from '@angular/material/core';
import { PersonService } from 'src/app/services/person/person.service';


@NgModule({
  declarations: [
    LobbyComponent, 
    PersonsComponent, 
    CoursesComponent, 
    HabilitiesComponent, 
    DialogHabilityCreateComponent, 
    DialogHabilityUpdateComponent, 
    DialogCourseCreateComponent, 
    DialogCourseUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.setLocale('es-ES'),
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LobbyRoutingModule
  ],
  providers: [
    HabilityService,
    CourseService,
    PersonService
  ],
  entryComponents: [
    DialogHabilityCreateComponent, 
    DialogHabilityUpdateComponent, 
    DialogCourseCreateComponent, 
    DialogCourseUpdateComponent
  ]
})
export class LobbyModule { }
