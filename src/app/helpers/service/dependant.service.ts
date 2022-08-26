import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dependant } from 'src/app/models/Dependant';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DependantService {

  private urlEndPoint = 'http://localhost:9090/api/dependant';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e: any): boolean{
    if(e.status==401){
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status==403){
      swal('I think there are problems',e.message,'warning');
      this.router.navigate(['/customer']);
      return true;
    }
    return false;
  }

  create(dependant: Dependant) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, dependant, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    )
  }

  getDependant(id: any): Observable<Dependant>{
    return this.http.get<Dependant>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    )
  }

  update(dependant: Dependant): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${dependant.id}`, dependant, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    )
  }
}
