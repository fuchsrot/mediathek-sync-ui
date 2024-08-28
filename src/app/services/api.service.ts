import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CreateTaskDto, Media, Task} from '../store';
import { Source } from '../store/sources/sources.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private httpClient: HttpClient) { }

  public loadTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('/api/tasks')
  }

  public loadMedia(): Observable<Media[]> {
    return this.httpClient.get<Media[]>('/api/media')
  }

  public loadSources(): Observable<Source[]> {
     return this.httpClient.get<Source[]>('/api/sources');
  }

  public createTask(createTask: CreateTaskDto): Observable<Task> {
    return this.httpClient.post<Task>('/api/tasks', createTask)
  }
}