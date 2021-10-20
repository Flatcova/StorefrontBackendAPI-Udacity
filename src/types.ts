  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
  };

  export interface Products {
    id: number;
    name: string;
    price: number;
    category: string;
  };

  export interface Order {
    id: number;
    user_id: string;
    order_status: string;
  };

  export interface OrderProduct {
    id: number;
    order_id: string;
    product_id: string;
    quantity: number;
  }