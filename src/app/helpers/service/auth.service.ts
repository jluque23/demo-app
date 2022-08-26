import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }
  
  public get user(): User{
    if(this._user != null){
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user') != null){
      return this._user = JSON.parse(sessionStorage.getItem('user')!) as User;
    }
    return new User();
  }

  public get token(): any{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
  }

  login(user: User): Observable<any> {
    const urlEndPoint = 'http://localhost:9090/oauth/token';
    const credenciales = btoa('demo' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  saveUser(accessToken: string){
    let payload = this.getInfoToken(accessToken);
    this._user = new User();
    this._user.firstName = payload.first_name;
    this._user.lastName = payload.last_name;
    this._user.username = payload.user_name;
    this._user.email = payload.email;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));

  }

  saveToken(accessToken: string){
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getInfoToken(accessToken: string):any{
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const payload = this.getInfoToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null!;
    this._user = null!;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
