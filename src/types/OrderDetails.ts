export interface OrderDetails {
    orderNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    date: string;
}

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}