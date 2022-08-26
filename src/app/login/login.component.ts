import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../helpers/service/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = "Login";
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }


  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal('Logged In', `You are actually in`,'success');
      this.router.navigate(['/customer']);
    }
  }

  login(): void{
    console.log(this.user);
    if(this.user.username == null || this.user.password == null){
      swal('Error Login','Username or password empty','error');
      return;
    }

    this.authService.login(this.user).subscribe(response =>{
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;

      swal('Login', `Hi ${user.firstName} you logged in succesfully`,'success');
      this.router.navigate(['/customer']);
    }, err => {
      if(err.status == 400){
        swal('Error Login','Wrong username or password','error');
      }
    }
    );
  }
}
