import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hability } from 'src/app/model/hability/hability';

@Injectable({
  providedIn: 'root'
})
export class HabilityService {

  constructor(private http: HttpClient) { }

  /**
   * Obtener todos las habilidades
   */
  getHabilities():Observable<any>{
    return this.http.get<any>('hability', { observe:'response'});
  }
  /**
   * Crear habilidad
   */
  create(hability: Hability):Observable<any>{
    return this.http.post<any>('hability', hability, { observe: 'response'})
  }
  /**
   * Crear habilidad
   */
  update(id: string ,hability: Hability):Observable<any>{
    return this.http.put<any>(`hability/${id}`, hability, { observe: 'response'})
  }
  /**
   * Eliminar
   */
  deleteHability(id):Observable<any>{
    return this.http.delete<any>(`hability/${id}`, { observe:'response'});
  }
}
