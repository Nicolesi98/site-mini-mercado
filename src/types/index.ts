export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  serviceDetails?: {
    price: string;
    availability: string;
    conditions: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  gender: string;
  deliveryDate: Date;
  deliveryTime: string;
  serviceType: string;
}