import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dependant } from 'src/app/models/Dependant';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DependantService {

  private urlEndPoint = 'http://localhost:9090/api/dependant';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  create(dependant: Dependant) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, dependant, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error creating',e.error.message,'error');
        return throwError(e);
      })
    )
  }

  getDependant(id: any): Observable<Dependant>{
    return this.http.get<Dependant>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error loading',e.error.message,'error');
        return throwError(e);
      })
    )
  }

  update(dependant: Dependant): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${dependant.id}`, dependant, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error updating',e.error.message,'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error deleting',e.error.message,'error');
        return throwError(e);
      })
    )
  }
}
