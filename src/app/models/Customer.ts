import { Dependant } from "./Dependant";

export class Customer {

    id: number;
    address: string;
    city: string;
    country: string;
    createAt: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    phoneNumber: string;
    status: string;
    updatedAt: string;
    dependants: Dependant[] = [];

}