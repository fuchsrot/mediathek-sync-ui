import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Task, TasksStateModel, Status } from './tasks.model'
import { ApiService } from "../../services/api.service";
import { LoadTasks } from "./tasks.actions";
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
        console.log('task')
        return state.tasks.filter(task => task.status === Status.SCHEDULED);
    }

    @Selector()
    static getCompletedTasks(state: TasksStateModel): Task[] {
        console.log('completed')
        console.log(state.tasks)
        const tasks = state.tasks.filter(task => task.status === "COMPLETED");
        console.log(tasks)
        return tasks;
    }

    @Action(LoadTasks)
    loadTransactions(ctx: StateContext<TasksStateModel>): Observable<Task[]> {
        console.log('Load Tasks')
        return this.apiService.loadTransactions().pipe(tap(tasks => ctx.patchState({ tasks: [...tasks] })))
    }


}