import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/helpers/service/customer.service';
import { Customer } from 'src/app/models/Customer';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.css']
})
export class CustomerformComponent implements OnInit {

  public customer: Customer = new Customer();
  public title: string = "Create Customer";

  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.customerService.getCustomer(id).subscribe( (customer) => this.customer = customer)
      }
    })
  }

  create(): void {
    this.customerService.create(this.customer)
    .subscribe(response => {
      this.router.navigate(['/customer'])
      console.log(response);
      swal('New Customer', `Customer ${response.customer.firstName} created succesfully!`, 'success')
    })
  }

  update(): void {
    this.customerService.update(this.customer)
    .subscribe( response => {
      this.router.navigate(['/customer'])
      swal('Customer Updated', `Customer ${response.customer.firstName} updated succesfully!`, 'success')
    })
  }

}
