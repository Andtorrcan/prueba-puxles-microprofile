import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HabilityService } from 'src/app/services/hability/hability.service';
import { Hability } from 'src/app/model/hability/hability';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-hability-create',
  templateUrl: './dialog-hability-create.component.html',
  styleUrls: ['./dialog-hability-create.component.scss']
})
export class DialogHabilityCreateComponent implements OnInit {

  public description: FormControl;
  public preload_create: boolean;

  constructor( private habilityService: HabilityService,
    public dialogRef: MatDialogRef<DialogHabilityCreateComponent>,) {
    this.description = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.preload_create = false;
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.description.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.description.hasError('minlength')) {
      return 'Min 3 caracteres';
    } else if (this.description.hasError('maxlength')) {
      return 'Max 50 caracteres';
    }
  }

  save(){
    if(this.description.valid){
      this.preload_create = true;
      let hab: Hability = new Hability();
      hab.description = this.description.value.toLowerCase();
      this.habilityService.create(hab).subscribe(res => {
        console.log(res);
        if(res.status == 201){
          Swal.fire({
            title: 'Habilidad creada',
            icon: 'success'
          });
          this.dialogRef.close('created');
        }
      }, err => {
        this.preload_create = false;
        console.log(err);
        Swal.fire({
          title: 'No se pudo crear la habilidad',
          icon: 'error'
        });
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}