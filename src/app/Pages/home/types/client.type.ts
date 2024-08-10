export interface Client {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Proveedor {
  proveedor: number[];
}

export type ClientList = Client[];
export type ClientCreate = Pick<
  Client,
  'name' | 'lastName' | 'email' | 'phone'
>;
