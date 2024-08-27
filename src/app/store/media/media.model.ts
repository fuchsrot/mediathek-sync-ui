export type MediaStatus = 'NEW' | 'SCHEDULED' | 'RUNNING' | 'DOWNLOADED' | 'DELETED'

export interface Media {
    id: string;
    title: string;
    content?: string;
    link: string;
    creator: string;
    pubDate: string;
    websiteUrl: string;
    duration: number;
    status: MediaStatus;
    source: {
        id: string,
        title: string
    };
    createDate: Date;
    updateDate: Date;
}

export interface MediaStateModel {
    media: Media[]
}