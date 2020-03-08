import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { Hability } from 'src/app/model/hability/hability';
import { HabilityService } from 'src/app/services/hability/hability.service';
import { CourseService } from 'src/app/services/course/course.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from 'src/app/model/course/course';

@Component({
  selector: 'app-dialog-course-update',
  templateUrl: './dialog-course-update.component.html',
  styleUrls: ['./dialog-course-update.component.scss']
})
export class DialogCourseUpdateComponent implements OnInit {
  //----Datos del taller
  public place: FormControl;
  public qualification: FormControl;
  public date: FormControl;
  public name: FormControl;
  public habilities_list: Hability[];
  public habilities_selected: FormControl;
  public hour_selected: FormControl;
  public selection: any[];
  //----Lista de habilidades
  public habilities_list_db: Hability[];
  //----Preloads
  public preload_create: boolean;
  public preload_load: boolean;

  constructor(
    private habilityService: HabilityService,
    private courseService: CourseService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogCourseUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    console.log(this.data);
    this.name = new FormControl(this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.place = new FormControl(this.data.place, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.qualification = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]);
    this.habilities_selected = new FormControl('', Validators.required);
    this.hour_selected = new FormControl(this.datePipe.transform(this.data.date, 'HH:mm'), [Validators.required, Validators.pattern('([0-2][0-9]:[0-5][0-9])'), Validators.minLength(5), Validators.maxLength(5)]);
    this.date = new FormControl(this.data.date, Validators.required);
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
        this.selection = [];
        for (let index = 0; index < this.data.habilities_list.length; index++) {
          this.selection.push(this.data.habilities_list[index].id);
        }
        this.habilities_selected.setValue(this.selection);
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
  save() {
    if (this.place.valid && this.date.valid && this.habilities_selected.valid) {
      this.preload_create = true;
      let course: Course = new Course();
      let d: Date = new Date(this.date.value);
      let d2 = (this.datePipe.transform(d, 'yyyy-MM-dd'));
      course.date = `${d2}T${this.hour_selected.value}:00`
      course.place = this.place.value;
      let habs: Hability[] = [];
      for (let index = 0; index < this.habilities_selected.value.length; index++) {
        for (let index2 = 0; index2 < this.habilities_list_db.length; index2++) {
          if (this.habilities_selected.value[index] == this.habilities_list_db[index2].id) {
            habs.push(this.habilities_list_db[index2]);
          }
        }
      }
      course.habilities_list = habs;
      course.qualification = 0;
      course.name = this.name.value;
      console.log(course);
      this.courseService.update(this.data.id, course).subscribe(res => {
        Swal.fire({
          title: 'Taller actualizado',
          icon: 'success'
        });
        this.preload_create = false;
        this.dialogRef.close('updated');
      }, err => {
        console.log(err);
        Swal.fire({
          title: 'No se pudo actualizar la habilidad',
          icon: 'error'
        });
      });
    }
  }

    /**
   * ERROR de nombre
   */
  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.name.hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.name.hasError('maxlength')) {
      return 'Max 50 caracteres';
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

  getErrorMessageHability() {
    if (this.habilities_selected.hasError('required')) {
      return 'Debes seleccionar minimo una';
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
