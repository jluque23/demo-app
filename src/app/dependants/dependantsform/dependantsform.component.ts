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
  public customerId: String;
  title = "Create a dependant";

  constructor(private activatedRoute: ActivatedRoute, private dependantService: DependantService, private router: Router) { }

  ngOnInit(): void {
    this.loadDependant();
  }

  create(): void {
    
    console.log(this.dependant);
    this.dependantService.create(this.dependant)
    .subscribe(response => {
      this.router.navigate(['/dependant', +this.dependant.customer.id])
      swal('New Dependant', `Dependant ${response.dependant.firstName} added succesfully!`, 'success')
    })
  }

  update(): void {
    this.dependantService.update(this.dependant)
    .subscribe( response => {
      this.router.navigate(['/dependant', +this.dependant.customer.id])
      swal('Dependant Updated', `Dependant ${response.dependant.firstName} updated succesfully!`, 'success')
    })
  }

  loadDependant(): void{
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['customerid'];
      let dependantId = params['dependantid'];
      
      if(dependantId){
        this.dependantService.getDependant(dependantId).subscribe( (dependant) => this.dependant = dependant)
      }
    })
  }
}
