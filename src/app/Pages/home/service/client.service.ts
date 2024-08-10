import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, ClientCreate, ClientList } from '../types/client.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  data$: BehaviorSubject<ClientList> = new BehaviorSubject<ClientList>([]);

  constructor(private http: HttpClient) {}

  public FetchData() {
    this.http
      .get<ClientList>('https://localhost:7117/api/v1/cliente')
      .subscribe({
        next: (data) => this.data$.next(data),
        error: (e) => console.log(e),
        complete: () => console.info('complete'),
      });
  }

  public SenData(client: ClientCreate) {
    this.http.post('https://localhost:7117/api/v1/cliente', client).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => this.AddDataClient(client),
    });
  }

  public GetData() {
    return this.data$;
  }

  public AddDataClient(client: ClientCreate) {
    const clientNew: Client = {
      name: client.name,
      email: client.email,
      lastName: client.lastName,
      phone: client.phone,
      id: Math.random(),
    };
    this.data$.next([...this.data$.value, clientNew]);
  }
}
