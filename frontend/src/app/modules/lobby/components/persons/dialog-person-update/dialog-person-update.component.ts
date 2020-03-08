import { Component, OnInit, Inject } from '@angular/core';
import { Course } from 'src/app/model/course/course';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course/course.service';
import { PersonService } from 'src/app/services/person/person.service';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';
import { Person } from 'src/app/model/person/person';

@Component({
  selector: 'app-dialog-person-update',
  templateUrl: './dialog-person-update.component.html',
  styleUrls: ['./dialog-person-update.component.scss']
})
export class DialogPersonUpdateComponent implements OnInit {

  //----Preloads
  public preload_create: boolean;
  public preload_courses: boolean;
  public preload_add: boolean;
  public preload_delete: boolean;
  //----Lista de talleres
  public courses_list: Course[];
  public person_courses: Course[];
  public course_selected: FormControl;
  public qualification: FormControl;
  //----Person actual
  public current_person: Person;
  //---.Formualrios datos basicos y talleres
  public firstFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogPersonUpdateComponent>,
    private _formBuilder: FormBuilder,
    private courseService: CourseService,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {
    this.current_person = this.data;
    this.preload_delete = false;
    this.preload_create = false;
    this.preload_courses = true;
    this.courses_list = [];
    this.person_courses = [];
    this.firstFormGroup = this._formBuilder.group({
      name: [this.current_person.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: [this.current_person.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: [this.current_person.address, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telephone: [this.current_person.telephone, [Validators.required, Validators.min(10000), Validators.max(999999999999999)]],
      email: [this.current_person.correo, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
    });
    this.course_selected = new FormControl('', Validators.required);
    this.qualification = new FormControl('', Validators.required);
    this.person_courses = this.current_person.courses_list;
  }

  ngOnInit(): void {
    if(this.person_courses == null){
      this.person_courses = [];
    }
    this.getCourses();
  }
  /**
   * Obtiene la persona por Id
   */
  getPersonByID() {
    this.personService.getPersonById(this.current_person.id).subscribe(res => {
      console.log(res);
      this.current_person = res.body;
      this.person_courses = this.current_person.courses_list;
      if(this.person_courses == null){
        this.person_courses = [];
      }
      if(this.person_courses != null){
        this.person_courses.forEach(element => {
          for (let index = 0; index < this.courses_list.length; index++) {
            if(element.id == this.courses_list[index].id){
              this.courses_list.splice(index,1);
            }
          }
        });
      }
     
      this.preload_courses = false;
    }, err => {
      console.log(err);
      Swal.fire({
        title: 'No se pudo obtener la persona',
        icon: 'error'
      });
    });
  }
  /**
   * Obtiene los talleres
   */
  getCourses() {
    this.courseService.getCourses().subscribe(res => {
      if (res.status == 200) {
        this.courses_list = res.body;
        this.courses_list.sort((a, b) => a.name.localeCompare(b.name));
        if(this.person_courses != null){
          this.person_courses.forEach(element => {
            for (let index = 0; index < this.courses_list.length; index++) {
              if(element.id == this.courses_list[index].id){
                this.courses_list.splice(index,1);
              }
            }
          });
        }
      
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
  save() {
    if(this.firstFormGroup.valid){
      this.preload_create = true;
      let p: Person = new Person();
      p.name = this.firstFormGroup.get('name').value;
      p.lastname = this.firstFormGroup.get('lastname').value;
      p.correo = this.firstFormGroup.get('email').value;
      p.address = this.firstFormGroup.get('address').value;
      p.telephone = this.firstFormGroup.get('telephone').value;
      p.courses_list = this.current_person.courses_list;
      console.log(p);
      this.personService.update(this.current_person.id,p).subscribe(res => {
        console.log(res);
        Swal.fire({
          title: 'Persona actualizada',
          icon: 'success'
        });
        this.dialogRef.close('created');
      }, err => {
        this.preload_create = false;
        Swal.fire({
          title: 'No se pudo actualziar la persona',
          icon: 'error'
        });
      });
    
    }
  }

  /**
   * Agregar curso a lista
   */
  addCourseToList(stepper: MatStepper) {
    console.log('asda');
    if (this.course_selected.valid) {
      this.preload_add = true;
      this.preload_courses = true;
      let course: Course = this.course_selected.value;
      this.person_courses.push(course);
      this.current_person.courses_list = this.person_courses;
      console.log(this.person_courses);
      this.personService.update(this.data.id, this.current_person).subscribe(res => {
        this.preload_add = false;
        console.log(res);
        if(res.status == 202){
          Swal.fire({
            icon: 'success',
            title: "Talleres de la persona actualizados"
          })
          stepper.next();
          this.course_selected.reset();
          this.qualification.reset();
          this.getPersonByID();
        }
     }, err => {
      this.preload_add = false;
        console.log(err);
        Swal.fire({
          title: 'No se pudieron actualizar los talleres',
          icon: 'error'
        });
      });
    }
  }
  /**
   * Eliminar curso de la lista
   */
  delete(id, stepper: MatStepper){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preload_delete = true;
        this.person_courses.splice(id,1);
        this.current_person.courses_list = this.person_courses;
        this.personService.update(this.data.id, this.current_person).subscribe(res => {
          Swal.fire({
            title: 'Taller eliminad0 de la persona',
            icon: 'success'
          });
          stepper.next();
          this.preload_delete = false;
          this.preload_courses = true;
          this.getPersonByID();
        }, err => {
          Swal.fire({
            title: 'No se pudo eliminar el taller de la persona',
            icon: 'error'
          });
        });
      }
    })
    
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


  getErrorMessageHability() {
    if (this.course_selected.hasError('required')) {
      return 'Debes seleccionar uno';
    }
  }

  getErrorMessageQualification(){
    if (this.qualification.hasError('required')) {
      return 'Debes seleccionar una';
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
