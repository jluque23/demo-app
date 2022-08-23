import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page' + page).pipe(
      map((response: any) => {
        (response.content as Customer[]).map(bug => {
          return bug;
        });
        return response;
      })
    )

  }
}
