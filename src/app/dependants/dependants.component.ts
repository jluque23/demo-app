import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../helpers/service/customer.service';
import { Customer } from '../models/Customer';
import { Dependant } from '../models/Dependant';

@Component({
  selector: 'app-dependants',
  templateUrl: './dependants.component.html',
  styleUrls: ['./dependants.component.css']
})
export class DependantsComponent implements OnInit {
  dependants: Dependant[];
  public customerId: number;
  public customer: Customer= new Customer();

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.customerId = id;
      
      if(id){
        this.customerService.getCustomer(id).subscribe( response => {
          this.dependants = response.dependants;
        })
      }
    })
  }

}
