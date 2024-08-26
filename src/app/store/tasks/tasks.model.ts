export interface TasksStateModel {
    tasks: Task[]
}

export enum Status {
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

    status: Status;

    type: Type;

    createDate: Date;

    updateDate: Date
}