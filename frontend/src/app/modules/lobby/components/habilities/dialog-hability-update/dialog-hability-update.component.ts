import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HabilityService } from 'src/app/services/hability/hability.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hability } from 'src/app/model/hability/hability';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-hability-update',
  templateUrl: './dialog-hability-update.component.html',
  styleUrls: ['./dialog-hability-update.component.scss']
})
export class DialogHabilityUpdateComponent implements OnInit {

  public description: FormControl;
  public preload_update: boolean;

  constructor( private habilityService: HabilityService,
    public dialogRef: MatDialogRef<DialogHabilityUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hability) {
    this.description = new FormControl(this.data.description, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.preload_update = false;
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
      this.preload_update = true;
      let hab: Hability = new Hability();
      hab.description = this.description.value.toLowerCase();
      this.habilityService.update(this.data.id,hab).subscribe(res => {
        console.log(res);
        if(res.status == 202){
          Swal.fire({
            title: 'Habilidad actualizada',
            icon: 'success'
          });
          this.dialogRef.close('updated');
        }
      }, err => {
        this.preload_update = false;
        console.log(err);
        Swal.fire({
          title: 'No se pudo actualizar la habilidad',
          icon: 'error'
        });
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}