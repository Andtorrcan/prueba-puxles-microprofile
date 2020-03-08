import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HabilityService } from 'src/app/services/hability/hability.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Hability } from 'src/app/model/hability/hability';
import Swal from 'sweetalert2';
import { DialogHabilityCreateComponent } from './dialog-hability-create/dialog-hability-create.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogHabilityUpdateComponent } from './dialog-hability-update/dialog-hability-update.component';

@Component({
  selector: 'app-habilities',
  templateUrl: './habilities.component.html',
  styleUrls: ['./habilities.component.scss']
})
export class HabilitiesComponent implements OnInit {
  //----Tabla
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<Hability>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //----Preloads
  public preload_load: boolean;
  public preload_delete: boolean;

  constructor(
    public dialog: MatDialog,
    private habilityService: HabilityService) {
    this.preload_load = true;
    this.preload_delete = false;
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
        this.dataSource = new MatTableDataSource(res.body.sort((a,b) => a.description.localeCompare(b.description)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
   * Filtro de tabla
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Abre modal de crear
   */
  create(){
    const dialogRef = this.dialog.open(DialogHabilityCreateComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result == "created"){
      this.ngOnInit();
     }
    });
  }

  /**
   * Abre modal de actualizar
   */
  update(hability){
    const dialogRef = this.dialog.open(DialogHabilityUpdateComponent, {
      width: '350px',
      data: hability
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result == "updated"){
      this.ngOnInit();
     }
    });
  }
  /**
   * Eliminar habilidad
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
        this.habilityService.deleteHability(id).subscribe(res => {
          Swal.fire({
            title: 'Habilidad eliminada',
            icon: 'success'
          });
          this.preload_delete = false;
          this.ngOnInit();
        }, err => {
          Swal.fire({
            title: 'No se pudo eliminar la habilidad',
            icon: 'error'
          });
        });
      }
    })
  }
}
