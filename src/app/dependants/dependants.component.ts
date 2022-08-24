import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { CustomerService } from '../helpers/service/customer.service';
import { DependantService } from '../helpers/service/dependant.service';
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

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private dependantService: DependantService) { }

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

  delete(dependant: Dependant): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al dependant ${dependant.firstName} ${dependant.lastName}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.dependantService.delete(dependant.id).subscribe(
          response => {
            this.dependants = this.dependants.filter(cli => cli !== dependant)
            swal(
              'Cliente Eliminado!',
              `Dependant ${dependant.firstName} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
