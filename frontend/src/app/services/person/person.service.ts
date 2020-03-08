import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/person/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
    /**
   * Obtener todos las personas
   */
  getPersons():Observable<any>{
    return this.http.get<any>('person', { observe:'response'});
  }
  /**
   * Obtener persona por id
   */
  getPersonById(id):Observable<any>{
    return this.http.get<any>(`person/${id}`, { observe:'response'});
  }
  /**
   * Crear persona
   */
  create(person: Person):Observable<any>{
    return this.http.post<any>('person', person, { observe: 'response'})
  }
  /**
   * Actualiza persona
   */
  update(id: string ,person: Person):Observable<any>{
    return this.http.put<any>(`person/${id}`, person, { observe: 'response'})
  }
  /**
   * Eliminar
   */
  deletePerson(id):Observable<any>{
    return this.http.delete<any>(`person/${id}`, { observe:'response'});
  }
}
