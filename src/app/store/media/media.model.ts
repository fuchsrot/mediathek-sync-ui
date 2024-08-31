export type MediaStatusFilter = 'NEW' | 'SCHEDULED' | 'RUNNING' | 'DOWNLOADED' | 'DELETED'

export type MediaStatus = 'NEW' | 'SCHEDULED_DOWNLOAD' | 'SCHEDULED_DELETE' | 'RUNNING' | 'DOWNLOADED' | 'DELETED'

export interface Filter {
    status?: MediaStatusFilter,
    source?: string,
    title?: string
}

export interface Media {
    id: string,
    title: string,
    content?: string,
    link: string,
    creator: string,
    pubDate: string,
    websiteUrl: string,
    duration: number,
    status: MediaStatus,
    source: {
        id: string,
        title: string
    },
    createDate: Date,
    updateDate: Date
}

export interface MediaStateModel {
    media: Media[],
    filter?: Filter
}