import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint = 'http://localhost:9090/api/customer';
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
      swal('Hi',e.message,'warning');
      this.router.navigate(['/customer']);
      return true;
    }
    return false;
  }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.urlEndPoint).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(e);
      })
    );
  }

  create(customer: Customer) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, customer, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    );
  }

  getCustomer(id: any): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    );
  }

  update(customer: Customer): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${customer.id}`, customer, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAuthorized(e);
        console.error(e.message);
        return throwError(e);
      })
    );
  }
}
