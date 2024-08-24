import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import {Task} from '../store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public loadTransactions(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('/api/tasks')
  }
}