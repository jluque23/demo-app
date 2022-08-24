import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependant } from 'src/app/models/Dependant';

@Injectable({
  providedIn: 'root'
})
export class DependantService {

  private urlEndPoint = 'http://localhost:9090/api/dependant';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  create(dependant: Dependant) : Observable<Dependant> {
    return this.http.post<Dependant>(this.urlEndPoint, dependant, {headers: this.httpHeaders})
  }

  getDependant(id: any): Observable<Dependant>{
    return this.http.get<Dependant>(`${this.urlEndPoint}/${id}`)
  }
}
