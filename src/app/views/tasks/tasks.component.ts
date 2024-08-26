import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { LoadTasks, Task, TasksState, Type } from '../../store';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ MatListModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  private scheduledTasks$: Observable<Task[]> = this.store.select(TasksState.getScheduledTasks)

  scheduledTasks = toSignal(this.scheduledTasks$)

  private completedTasks$: Observable<Task[]> = this.store.select(TasksState.getCompletedTasks)

  completedTasks = toSignal(this.completedTasks$)

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

  mapTaskInfo(task: Task): string {
    let info = `ID: ${task.id}`;
    if (task.mediaTitle) {
      info += ` | ${task.mediaTitle}`
    }
    return info;
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }
}
