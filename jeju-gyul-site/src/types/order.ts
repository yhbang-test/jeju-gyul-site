export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface OrderForm {
  customerName: string;
  phoneNumber: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: 'card' | 'transfer'; // 결제 방식 제한
}