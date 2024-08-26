import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import {Media, Task} from '../store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public loadTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('/api/tasks')
  }

  public loadMedia(): Observable<Media[]> {
    return this.httpClient.get<Task[]>('/api/media')
  }
}