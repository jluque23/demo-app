import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    swal('Logout', `Hola ${this.authService.user.username}, has closed session succesfully!`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
