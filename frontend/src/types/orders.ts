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
  Products: {
    id: string;
    quantity: number;
  }[];
};

export interface OrderFromBackend {
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
      quantity: number;
    }
  ];
}
