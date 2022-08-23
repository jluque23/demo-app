import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DependantService } from 'src/app/helpers/service/dependant.service';
import { Dependant } from 'src/app/models/Dependant';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dependantsform',
  templateUrl: './dependantsform.component.html',
  styleUrls: ['./dependantsform.component.css']
})
export class DependantsformComponent implements OnInit {
  
  public dependant: Dependant = new Dependant();
  title = "Create a dependant";

  constructor(private activatedRoute: ActivatedRoute, private dependantService: DependantService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.dependant);
  }

  create(): void {
    this.loadCustomerId();
    console.log(this.dependant);
    this.dependantService.create(this.dependant)
    .subscribe(dependant => {
      this.router.navigate(['/dependant', +this.dependant.customer.id])
      swal('New Dependant', `Dependant ${this.dependant.firstName} added succesfully!`, 'success')
    })
  }

  update(): void{

  }

  loadCustomerId(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.dependant.customer.id = id;
      }
    })
  }
}
