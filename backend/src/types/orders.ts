export interface NewOrder {
  products: {
    id: string;
    quantity: number;
  }[];
  email: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

export type OrderInDb = Omit<NewOrder, 'products'> & {
  id: string;
};

export interface OrderFromDb {
  id: string;
  email: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  Products: [
    {
      id: string;
      title: string;
      price: number;
      instock: number;
      ProductOrder: {
        quantity: number;
      };
    }
  ];
}

export type OrderForFrontend = Omit<OrderFromDb, 'Products'> & {
  Products: [
    {
      id: string;
      title: string;
      price: number;
      instock: number;
      quantity: number;
    }
  ];
};
