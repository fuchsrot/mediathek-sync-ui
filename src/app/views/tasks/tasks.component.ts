import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Store } from '@ngxs/store';
import { LoadTasks, Task, TasksState, Type } from '../../store';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  scheduledTasks$: Observable<Task[]> = this.store.select(TasksState.getScheduledTasks)

  completedTasks$: Observable<Task[]> = this.store.select(TasksState.getCompletedTasks)

  constructor(private readonly store: Store) { }

  mapType(type: Type): string {
    switch (type) {
      case Type.DOWNLOAD_MEDIA:
        return "Download Media";
      case Type.REFRESH_RSS:
        return "Refresh RSS"
    }
  }

  mapIcon(type: Type): string {
    switch (type) {
      case Type.DOWNLOAD_MEDIA:
        return "download";
      case Type.REFRESH_RSS:
        return "refresh"
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }
}
