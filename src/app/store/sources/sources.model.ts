export interface Source {
    id: string,
    title: string,
    url: string
}

export interface SourcesStateModel {
    sources: Source[]
}