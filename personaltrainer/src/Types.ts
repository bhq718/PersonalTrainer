export type Customer = {

      firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: number;
        city: string;
        email: string;
        phone: string;
        _links: {
          self: {
            href: string;
          },
          customer: {
           href: string;
          }
        }
}

export type CustomerForm =Omit<Customer, '_links'>;