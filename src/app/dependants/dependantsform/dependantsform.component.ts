import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependant } from 'src/app/models/Dependant';

@Component({
  selector: 'app-dependantsform',
  templateUrl: './dependantsform.component.html',
  styleUrls: ['./dependantsform.component.css']
})
export class DependantsformComponent implements OnInit {
  
  public dependant: Dependant = new Dependant();
  title = "Create a dependant";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCustomerId();
    console.log(this.dependant);
  }

  create(): void{
    console.log(this.dependant);
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
