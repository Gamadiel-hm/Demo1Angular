import { Component, OnInit } from '@angular/core';
import { ClientService } from './service/client.service';
import { Observable } from 'rxjs';
import { ClientCreate, ClientList } from './types/client.type';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  formClient: FormGroup = new FormGroup({});
  getClient$: Observable<ClientList> = new Observable<ClientList>();

  createForm() {
    this.formClient = this.formBuilder.group({
      name: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  constructor(
    private serviceCLient: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.getClient$ = this.serviceCLient.GetData();
  }

  ngOnInit(): void {
    this.serviceCLient.FetchData();
  }

  sendData() {
    const { name, lastName, email, phone } = this.formClient.value;
    const newClient: ClientCreate = { name, lastName, email, phone };
    this.serviceCLient.SenData(newClient);
  }
}
