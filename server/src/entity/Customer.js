
import { EntitySchema } from "typeorm";
import { CustomersRepository } from "../bus/customers/customers.repository";

export const CustomerEntity = new EntitySchema({
    name: "customers",
    target: CustomersRepository,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        firstName: {
            type: "varchar",
            nullable: false,
        },
        lastName: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "text",
            nullable: false
        },
        password: {
            type: "text"
        },
        age: {
            nullable: true,
            type: "text"
        },
        city: {
            nullable: true,
            type: "text"
        },
    }
});