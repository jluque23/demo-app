import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../helpers/service/customer.service';
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-customerindex',
  templateUrl: './customerindex.component.html',
  styleUrls: ['./customerindex.component.css']
})
export class CustomerindexComponent implements OnInit {

  public customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  this.customerService.getCustomers().subscribe(
    customers => this.customers = customers   
    );

    console.log(this.customers);
  }


}
