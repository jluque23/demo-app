import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint = 'http://localhost:9090/api/customer';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Customer[])
    );
  }

  create(customer: Customer) : Observable<Customer> {
    return this.http.post<Customer>(this.urlEndPoint, customer, {headers: this.httpHeaders})
  }

  getCustomer(id: any): Observable<Customer>{
    return this.http.get<Customer>(`${this.urlEndPoint}/${id}`)
  }

  update(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.urlEndPoint}/${customer.id}`, customer, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Customer>{
    return this.http.delete<Customer>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}
