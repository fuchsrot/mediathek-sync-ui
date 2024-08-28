export interface TasksStateModel {
    tasks: Task[]
}

export enum TaskStatus {
    SCHEDULED = "SCHEDULED",
    RUNNING = "RUNNING",
    ERROR = "ERROR",
    COMPLETED = "COMPLETED"
}

export enum Type {
    DOWNLOAD_MEDIA = "DOWNLOAD_MEDIA",
    REFRESH_RSS = "REFRESH_RSS"
}

export interface Target {
    id: string;
    title: string;
}

export interface Task {

    id: string;

    target: Target;

    status: TaskStatus;

    type: Type;

    createDate: Date;

    updateDate: Date
}

export interface CreateTaskDto {
    targetId: string,
    type: Type
}