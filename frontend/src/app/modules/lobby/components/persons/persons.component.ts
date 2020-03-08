import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person/person.service';
import Swal from 'sweetalert2';
import { DialogPersonCreateComponent } from './dialog-person-create/dialog-person-create.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonUpdateComponent } from './dialog-person-update/dialog-person-update.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  //----Preloads
  public preload_load: boolean;
  public preload_delete: boolean;
  //----Lista de personas
  public persons_list;

  constructor(private personService: PersonService,
    public dialog: MatDialog,) {
    this.preload_load = true;
  }

  ngOnInit(): void {
    this.getPersons();
  }

  /**
   * Trae las personas
   */
  getPersons(){
    this.personService.getPersons().subscribe(res => {
      if(res.status == 200){
        this.persons_list = res.body;
        this.preload_load = false;
        console.log(this.persons_list);
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: "No se pudieron obtener las personas"
      });
    })
  }

  /**
   * Crea una persona
   */
  create(){
    const dialogRef = this.dialog.open(DialogPersonCreateComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result == "created"){
      this.ngOnInit();
     }
    });
  }
/**
   * Edita una persona
   */
  update(person){
    const dialogRef = this.dialog.open(DialogPersonUpdateComponent, {
      width: '500px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  /**
   * Eliminar persona
   */
  delete(id){
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
        this.personService.deletePerson(id).subscribe(res => {
          Swal.fire({
            title: 'Taller eliminad0',
            icon: 'success'
          });
          this.preload_delete = false;
          this.ngOnInit();
        }, err => {
          Swal.fire({
            title: 'No se pudo eliminar el taller',
            icon: 'error'
          });
        });
      }
    })
  }
}