import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint = 'http://localhost:9090/api/customer';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Customer[])
    );
  }

  create(customer: Customer) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, customer, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error creating',e.error.message,'error');
        return throwError(e);
      })
    );
  }

  getCustomer(id: any): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal('Error loading',e.error.message,'error');
        return throwError(e);
      })
    );
  }

  update(customer: Customer): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${customer.id}`, customer, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error editing',e.error.message,'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.message);
        swal('Error deleting',e.error.message,'error');
        return throwError(e);
      })
    );
  }
}
