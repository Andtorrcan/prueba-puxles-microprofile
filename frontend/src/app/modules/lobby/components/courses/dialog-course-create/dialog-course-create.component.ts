import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Hability } from 'src/app/model/hability/hability';
import { HabilityService } from 'src/app/services/hability/hability.service';
import Swal from 'sweetalert2';
import { Course } from 'src/app/model/course/course';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-course-create',
  templateUrl: './dialog-course-create.component.html',
  styleUrls: ['./dialog-course-create.component.scss']
})
export class DialogCourseCreateComponent implements OnInit {
  //----Datos del taller
  public place: FormControl;
  public qualification: FormControl;
  public date: FormControl;
  public habilities_list: Hability[];
  public habilities_selected: FormControl;
  public hour_selected: FormControl;
  //----Lista de habilidades
  public habilities_list_db: Hability[];
  //----Preloads
  public preload_create: boolean;
  public preload_load: boolean;

  constructor(
    private habilityService: HabilityService,
    private courseService: CourseService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogCourseCreateComponent>,) {
    this.place = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.qualification = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]);
    this.habilities_selected = new FormControl('', Validators.required);
    this.hour_selected =  new FormControl('00:00', [Validators.required, Validators.pattern('([0-2][0-9]:[0-5][0-9])'), Validators.minLength(5), Validators.maxLength(5)]);
    this.date = new FormControl('', Validators.required);
    this.preload_create = false;
    this.preload_load = true;
    this.habilities_list_db = [];
  }

  ngOnInit(): void {
    this.getHabilities();
  }

  /**
   * Obtiene la lista de habilidades
   */
  getHabilities() {
    this.habilityService.getHabilities().subscribe(res => {
      if (res.status == 200) {
        this.habilities_list_db = res.body;
        this.preload_load = false;
      }
    }, err => {
      console.log(err);
      Swal.fire({
        title: 'No se pudieron obtener las habilidades',
        icon: 'error'
      });
    });
  }

  /**
   * Crea un taller
   */
  save(){
    if(this.place.valid && this.date.valid && this.habilities_selected.valid){
      this.preload_create = true;
      let course: Course = new Course();
      let d:Date = new Date(this.date.value);
     let d2 = (this.datePipe.transform(d, 'yyyy-MM-dd'));
      course.date = `${d2}T${this.hour_selected.value}:00`
      course.place = this.place.value;
      course.habilities_list = this.habilities_selected.value;
      course.qualification = 0;
      console.log(course);
      this.courseService.create(course).subscribe(res => {
        console.log(res);
        Swal.fire({
          title: 'Taller creado',
          icon: 'success'
        });
        this.preload_create = false;
        this.dialogRef.close('created');
      }, err => {
        console.log(err);
        Swal.fire({
          title: 'No se pudo eliminar la habilidad',
          icon: 'error'
        });
      });
    }
  }

  /**
   * ERROR de lugar
   */
  getErrorMessagePlace() {
    if (this.place.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.place.hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.place.hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }
  /**
   * Error de calificación
   */
  getErrorMessageQualification() {
    if (this.place.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.place.hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.place.hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }

  getErrorMessageDate() {
      return 'Debes seleccionar una fecha valida';
  }

  getErrorMessageHability(){
    if (this.habilities_selected.hasError('required')) {
      return 'Debes seleccionar minimo una';
    }
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
