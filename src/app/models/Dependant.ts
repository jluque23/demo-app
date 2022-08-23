import { Customer } from "./Customer";

export class Dependant{
    id: number;
    address: string;
    city: string;
    country: string;
    createAt: string;
    firstName: string;
    gender: string;
    lastName: string;
    relationToCostumer: string;
    updatedAt: string;
    customer: Customer = new Customer();
}
