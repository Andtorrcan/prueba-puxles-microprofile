import { Injectable } from '@angular/core';
import { Course } from 'src/app/model/course/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  /**
   * Obtener todos los tallere
   */
  getCourses():Observable<any>{
    return this.http.get<any>('course', { observe:'response'});
  }
  /**
   * Crear taller
   */
  create(course: Course):Observable<any>{
    return this.http.post<any>('course', course, { observe: 'response'})
  }
  /**
   * Actualiza taller 
   */
  update(id: string ,course: Course):Observable<any>{
    return this.http.put<any>(`course/${id}`, course, { observe: 'response'})
  }
  /**
   * Eliminar
   */
  deleteCourse(id):Observable<any>{
    return this.http.delete<any>(`course/${id}`, { observe:'response'});
  }
}
