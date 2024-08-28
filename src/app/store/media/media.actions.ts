import { MediaStatus } from "./media.model";

export class LoadMedia {
    static readonly type = '[Media] Load';
}

export class SetMediaStatus {
    static readonly type = '[Media] Set Media Status';

    constructor(public id: string, public status: MediaStatus) {}
}

export class SetSourceFilter {
    static readonly type = '[Media] Set Source Filter';

    constructor(public source: string) {}
}

export class SetStatusFilter {
    static readonly type = '[Media] Set Status Filter';

    constructor(public status: MediaStatus) {}
}

export class SetTitleFilter {
    static readonly type = '[Media] Set Title Filter';

    constructor(public title: string) {}
}