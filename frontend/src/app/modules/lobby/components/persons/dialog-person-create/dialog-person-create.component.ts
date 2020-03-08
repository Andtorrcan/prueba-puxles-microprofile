import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Course } from 'src/app/model/course/course';
import { CourseService } from 'src/app/services/course/course.service';
import { PersonService } from 'src/app/services/person/person.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Person } from 'src/app/model/person/person';

@Component({
  selector: 'app-dialog-person-create',
  templateUrl: './dialog-person-create.component.html',
  styleUrls: ['./dialog-person-create.component.scss']
})
export class DialogPersonCreateComponent implements OnInit {
  //----Preloads
  public preload_create:boolean;
  public preload_courses: boolean;
  public preload_add: boolean;
  //----Lista de talleres
  public courses_list: Course[];
  public person_courses: Course[];
  public course_selected: FormControl;
  public qualification: FormControl; 
  //---.Formualrios datos basicos y talleres
  public  firstFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogPersonCreateComponent>,
    private _formBuilder: FormBuilder,
    private courseService: CourseService,
    private personService: PersonService) {
    this.preload_create = false;
    this.preload_courses = true;
    this.courses_list = [];
    this.person_courses = [];
    this.firstFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.min(10000), Validators.max(999999999999999)]],
      email: ['', [Validators.required,Validators.email ,Validators.minLength(3), Validators.maxLength(50)]],
    });
    this.course_selected = new FormControl('', Validators.required);
    this.qualification = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
   this.getCourses();
  }
  /**
   * Obtiene los talleres
   */
  getCourses(){
    this.courseService.getCourses().subscribe(res => {
      if (res.status == 200) {
        this.courses_list = res.body;
        this.preload_courses = false;
      }

    }, err => {
      console.log(err);
      Swal.fire({
        title: 'No se pudieron obtener los talleres',
        icon: 'error'
      });
    });
  }

  /**
   * Crea la persona
   */
  save(){
    if(this.firstFormGroup.valid){
      this.preload_create = true;
      let p: Person = new Person();
      p.name = this.firstFormGroup.get('name').value;
      p.lastname = this.firstFormGroup.get('lastname').value;
      p.correo = this.firstFormGroup.get('email').value;
      p.address = this.firstFormGroup.get('address').value;
      p.telephone = this.firstFormGroup.get('telephone').value;
      console.log(p);
      this.personService.create(p).subscribe(res => {
        console.log(res);
        Swal.fire({
          title: 'Persona creada',
          icon: 'success'
        });
        this.dialogRef.close('created');
      }, err => {
        this.preload_create = false;
        Swal.fire({
          title: 'No se pudo crear la persona',
          icon: 'error'
        });
      });
    }

  }
  /**
   * ERROR de nombre
   */
  getErrorMessageName() {
    if (this.firstFormGroup.get('name').hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstFormGroup.get('name').hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.firstFormGroup.get('name').hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }
    /**
   * ERROR de apellido
   */
  getErrorMessageLastname() {
    if (this.firstFormGroup.get('lastname').hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstFormGroup.get('lastname').hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.firstFormGroup.get('lastname').hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }
      /**
   * ERROR de dirección
   */
  getErrorMessageAddress() {
    if (this.firstFormGroup.get('address').hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstFormGroup.get('address').hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.firstFormGroup.get('address').hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }
       /**
   * ERROR de dirección
   */
  getErrorMessageTelephone() {
    if (this.firstFormGroup.get('telephone').hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstFormGroup.get('telephone').hasError('min')) {
      return 'Min 5 caracteres';
    } else if (this.firstFormGroup.get('telephone').hasError('max')) {
      return 'Max 15 caracteres';
    }
  }
     /**
   * ERROR de email
   */
  getErrorMessageEmail() {
    if (this.firstFormGroup.get('email').hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstFormGroup.get('email').hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.firstFormGroup.get('email').hasError('maxlength')) {
      return 'Max 50 caracteres';
    } else if (this.firstFormGroup.get('email').hasError('email')) {
      return 'Email no valido';
    }
  }
    
  onNoClick(): void {
    this.dialogRef.close();
  }
}
