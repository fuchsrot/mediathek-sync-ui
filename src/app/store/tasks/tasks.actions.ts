import { CreateTask } from "./tasks.model";

export class LoadTasks {
    static readonly type = '[Tasks] Load';
}

export class SaveTask {
    static readonly type = '[Tasks] Save';
    constructor(public dto: CreateTask) {}
}