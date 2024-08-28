import { CreateTaskDto, Type } from "./tasks.model";

export class LoadTasks {
    static readonly type = '[Tasks] Load';
}

export class CreateTask {
    static readonly type = '[Tasks] Save';
    constructor(public id: string, public type: Type) {}
}