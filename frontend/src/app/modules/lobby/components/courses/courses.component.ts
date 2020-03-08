import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/model/course/course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogCourseCreateComponent } from './dialog-course-create/dialog-course-create.component';
import { DialogHabilityUpdateComponent } from '../habilities/dialog-hability-update/dialog-hability-update.component';
import { DialogCourseUpdateComponent } from './dialog-course-update/dialog-course-update.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  //----Tabla
  displayedColumns: string[] = ['id', 'date','place','habilities_list', 'actions'];
  dataSource: MatTableDataSource<Course>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //----Preloads
  public preload_load: boolean;
  public preload_delete: boolean;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService) {
    this.preload_load = true;
    this.preload_delete = false;
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourses().subscribe(res => {
      if (res.status == 200) {
        this.dataSource = new MatTableDataSource(res.body.sort((a,b) => a.date.localeCompare(b.date)));
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
    const dialogRef = this.dialog.open(DialogCourseCreateComponent, {
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
  update(course){
    const dialogRef = this.dialog.open(DialogCourseUpdateComponent, {
      width: '350px',
      data: course
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
        this.courseService.deleteCourse(id).subscribe(res => {
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
