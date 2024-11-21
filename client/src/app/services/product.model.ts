export interface Product {
  id?: number; // Optional for creation
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;

}