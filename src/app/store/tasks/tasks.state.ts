import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CreateTask, Task, TasksStateModel, TaskStatus } from './tasks.model'
import { ApiService } from "../../services/api.service";
import { LoadTasks, SaveTask } from "./tasks.actions";
import { Observable, tap } from "rxjs";

@State<TasksStateModel>({
    name: "tasksState",
    defaults: {
        tasks: []
    }
})
@Injectable()
export class TasksState {

    constructor(private apiService: ApiService) { }


    @Selector()
    static getScheduledTasks(state: TasksStateModel): Task[] {
        return state.tasks.filter(task => task.status === TaskStatus.SCHEDULED);
    }

    @Selector()
    static getCompletedTasks(state: TasksStateModel): Task[] {
        return state.tasks.filter(task => task.status === TaskStatus.COMPLETED);
    }

    @Action(LoadTasks)
    loadTasks(ctx: StateContext<TasksStateModel>): Observable<Task[]> {
        return this.apiService.loadTasks().pipe(tap(tasks => ctx.patchState({ tasks: [...tasks] })))
    }

    @Action(SaveTask)
    saveTask(ctx: StateContext<TasksStateModel>, {dto}: SaveTask) {
        this.apiService.saveTask(dto)
    }
}